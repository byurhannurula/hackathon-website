"use client";

import { useToast, useAdminRegistrations } from "@/hooks";
import { Toast } from "@/components/ui";
import { AdminNav } from "./admin-nav";
import { StatsGrid } from "./stats-grid";
import { ControlsBar } from "./controls-bar";
import { RegistrationsTable } from "./registrations-table";
import { RegistrationSheet } from "./registration-sheet";
import { RegistrationToggleCard } from "./registration-toggle-card";
import { ConfirmModal } from "./confirm-modal";
import { ToggleModal } from "./toggle-modal";
import { BroadcastModal } from "./broadcast-modal";

export function AdminDashboard() {
  const { toast, show: showToast } = useToast();
  const admin = useAdminRegistrations(showToast);

  return (
    <>
      {toast && <Toast message={toast.message} type={toast.type} />}

      {admin.confirmAction && (
        <ConfirmModal
          confirmAction={admin.confirmAction}
          onCancel={() => admin.setConfirmAction(null)}
          onConfirm={admin.confirmStatusChange}
        />
      )}

      {admin.regToggleStep > 0 && (
        <ToggleModal
          regOpen={admin.regOpen}
          step={admin.regToggleStep as 1 | 2}
          onStepChange={admin.setRegToggleStep}
          onConfirm={admin.confirmAndToggleRegistration}
        />
      )}

      {admin.broadcastOpen && (
        <BroadcastModal
          stats={admin.stats}
          loading={admin.broadcastLoading}
          onClose={() => admin.setBroadcastOpen(false)}
          onSend={admin.sendBroadcast}
        />
      )}

      <AdminNav />

      <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-6">
        <StatsGrid stats={admin.stats} />

        <ControlsBar
          search={admin.search}
          onSearch={admin.handleSearch}
          statusFilter={admin.statusFilter}
          onStatusFilter={admin.setStatusFilter}
          onBroadcast={() => admin.setBroadcastOpen(true)}
        />

        <RegistrationsTable
          data={admin.data}
          loading={admin.loading}
          selectedReg={admin.selectedReg}
          onSelect={admin.setSelectedReg}
          pagination={admin.pagination}
          page={admin.page}
          sort={admin.sort}
          order={admin.order}
          onSort={admin.handleSort}
          onPageChange={admin.goToPage}
        />

        <RegistrationToggleCard
          regOpen={admin.regOpen}
          loading={admin.regToggleLoading}
          onClick={() => admin.setRegToggleStep(1)}
        />
      </div>

      {admin.selectedReg && (
        <RegistrationSheet
          reg={admin.selectedReg}
          onClose={() => admin.setSelectedReg(null)}
          onUpdateStatus={admin.requestStatusChange}
          isLoading={admin.selectedRegLoading}
          onNotesUpdated={admin.handleNotesUpdated}
          onError={(msg) => admin.showToast(msg, "error")}
        />
      )}
    </>
  );
}
