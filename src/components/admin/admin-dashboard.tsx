"use client";

import { useToast } from "@/hooks";
import { useAdminRegistrations } from "@/hooks";
import { Toast } from "@/components/ui";
import { AdminNav } from "./admin-nav";
import { StatsGrid } from "./stats-grid";
import { ControlsBar } from "./controls-bar";
import { RegistrationsTable } from "./registrations-table";
import { RegistrationSheet } from "./registration-sheet";
import { ConfirmModal } from "./confirm-modal";
import { ToggleModal } from "./toggle-modal";

export function AdminDashboard() {
  const { toast, show: showToast } = useToast();
  const admin = useAdminRegistrations(showToast);

  return (
    <div className="min-h-screen bg-bg text-white">
      {/* Toast */}
      {toast && <Toast message={toast.message} type={toast.type} />}

      {/* Confirmation Modal */}
      {admin.confirmAction && (
        <ConfirmModal
          confirmAction={admin.confirmAction}
          onCancel={() => admin.setConfirmAction(null)}
          onConfirm={admin.confirmStatusChange}
        />
      )}

      {/* Registration Toggle Modal */}
      {admin.regToggleStep > 0 && (
        <ToggleModal
          regOpen={admin.regOpen}
          step={admin.regToggleStep as 1 | 2}
          onStepChange={admin.setRegToggleStep}
          onConfirm={admin.confirmAndToggleRegistration}
        />
      )}

      {/* Header */}
      <AdminNav
        regOpen={admin.regOpen}
        regToggleLoading={admin.regToggleLoading}
        onToggleClick={() => admin.setRegToggleStep(1)}
        onLogout={admin.handleLogout}
      />

      <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-6">
        <StatsGrid stats={admin.stats} />

        <ControlsBar
          search={admin.search}
          onSearch={admin.handleSearch}
          statusFilter={admin.statusFilter}
          onStatusFilter={admin.setStatusFilter}
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
          fmtDate={admin.fmtDate}
        />
      </div>

      {/* Sheet overlay + panel */}
      {admin.selectedReg && (
        <RegistrationSheet
          reg={admin.selectedReg}
          onClose={() => admin.setSelectedReg(null)}
          onUpdateStatus={admin.requestStatusChange}
          isLoading={admin.actionLoading === admin.selectedReg.id}
          fmtDate={admin.fmtDate}
        />
      )}
    </div>
  );
}
