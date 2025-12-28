import "react-circular-progressbar/dist/styles.css";
import { useEffect, useMemo, useState } from "react";
import {
  Square3Stack3DIcon,
  DocumentMinusIcon,
  DocumentPlusIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { NavLink } from "react-router-dom";
import { TableWithPagination } from "../Generic/TableWithPagination";
import {
  useGetAdminEmailAndIdListQuery,
  useGetAllTicketOverviewQuery,
  useGetSuperAdminDetailsQuery,
  useGetAllUserTicketsQuery,
  useGetUsersEmailAndIdListQuery,
  useCreateAdminMutation,
} from "../../store/api/userTicketAPI";
import { useSelector } from "react-redux";
import getStatusClass from "../../util/getStatusClass";
import TableSkeleton from "../Generic/TableSkeleton";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

const tableHeading = [
  "Sn.No.",
  "Name",
  "Email",
  "Open",
  "In Process",
  "Resolve",
  "T.Assigned",
];

const usersTableHeading = [
  "Sn.No.",
  "Name",
  "Email",
];

const allTicketsHeading = [
  "Sn.No.",
  "Title",
  "User Name",
  "Category",
  "Priority",
  "Status",
  "Assignee",
];

const iconMap = {
  square3Stack3DIcon: Square3Stack3DIcon,
  documentMinusIcon: DocumentMinusIcon,
  documentPlusIcon: DocumentPlusIcon,
};

export default function Dashboard() {
  const userId = useSelector((state) => state.userInfoReducer.userId);

  const { isLoading: fetchingSuperAdminDetails, data: superAdminDetails } =
    useGetSuperAdminDetailsQuery({ userId });

  const { isLoading: isfetchingTicketOverview, data: ticketOverview } =
    useGetAllTicketOverviewQuery({ userId }, { skip: !userId });

  const { isLoading: fetchingAllUserTickets, data: allUserTickets } =
    useGetAllUserTicketsQuery({ userId }, { skip: !userId });

  const { isLoading: fetchingUsersList, data: usersList } =
    useGetUsersEmailAndIdListQuery({ userId }, { skip: !userId });

  const { isLoading: fetchingAdminsList, data: adminsList } =
    useGetAdminEmailAndIdListQuery({ userId }, { skip: !userId });

  const [createAdmin, { isLoading: isCreatingAdmin }] = useCreateAdminMutation();

  const [isCreateAdminModalOpen, setIsCreateAdminModalOpen] = useState(false);
  const [newAdminData, setNewAdminData] = useState({ name: "", email: "", password: "" });

  const [ticketAssignUnassign, setTicketAssignUnassign] = useState([
    {
      label: "Total Tickets Assigned",
      count: 0,
      icon: "documentPlusIcon",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      label: "Total Tickets Unassigned",
      count: 0,
      icon: "documentMinusIcon",
      bgColor: "bg-yellow-50",
      iconColor: "text-yellow-600",
    },
  ]);

  const [progressBarDetails, setProgressBarDetails] = useState([
    {
      label: "Open",
      count: 0,
      percentage: 0,
      pathColor: "#3B82F6",
      textColor: "#3B82F6",
      query: "OPEN",
    },
    {
      label: "In Process",
      count: 0,
      percentage: 0,
      pathColor: "#EAB308",
      textColor: "#EAB308",
      query: "INPROCESS",
    },
    {
      label: "Resolved",
      count: 0,
      percentage: 0,
      pathColor: "#22C55E",
      textColor: "#22C55E",
      query: "RESOLVED",
    },
  ]);

  useEffect(() => {
    if (!isfetchingTicketOverview && ticketOverview?.data) {
      const { assignedTickets, notAssignedTickets, open, inprocess, resolved } =
        ticketOverview.data;
      const totalTickets = open + inprocess + resolved;

      setTicketAssignUnassign((prev) => [
        { ...prev[0], count: assignedTickets },
        { ...prev[1], count: notAssignedTickets },
      ]);

      setProgressBarDetails((prev) => [
        {
          ...prev[0],
          count: open,
          percentage: totalTickets
            ? Math.floor((open / totalTickets) * 100)
            : 0,
        },
        {
          ...prev[1],
          count: inprocess,
          percentage: totalTickets
            ? Math.floor((inprocess / totalTickets) * 100)
            : 0,
        },
        {
          ...prev[2],
          count: resolved,
          percentage: totalTickets
            ? Math.floor((resolved / totalTickets) * 100)
            : 0,
        },
      ]);
    }
  }, [isfetchingTicketOverview, ticketOverview]);

  const allTicketTableData = useMemo(() => {
    if (!allUserTickets?.data) return [];

    return allUserTickets.data.map((ticket) => ({
      id: ticket._id,
      title: ticket.title,
      userName: ticket.userDetails?.name || "N/A",
      category: ticket.category,
      priority: ticket.priority,
      status: (
        <span className={getStatusClass(ticket.status)}>{ticket.status}</span>
      ),
      assignee: ticket.assigneeDetails?.name || "Unassigned",
    }));
  }, [allUserTickets]);

  const usersTableData = useMemo(() => {
    if (!usersList?.data) return [];
    
    return usersList.data.map((user) => ({
      id: user._id,
      name: user.name,
      email: user.email,
    }));
  }, [usersList]);

  const adminsTableData = useMemo(() => {
    if (!adminsList?.data) return [];

    return adminsList.data.map((admin) => ({
      id: admin._id,
      name: admin.name,
      email: admin.email,
      open: admin.open,
      inProcess: admin.inProcess,
      resolve: admin.resolve,
      assigned: admin.open + admin.inProcess + admin.resolve,
    }));
  }, [adminsList]);


  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    try {
      await createAdmin({ userId, adminData: newAdminData }).unwrap();
      setIsCreateAdminModalOpen(false);
      setNewAdminData({ name: "", email: "", password: "" });
      alert("Admin created successfully!");
    } catch (err) {
      console.error("Failed to create admin:", err);
      alert(err.data?.message || "Failed to create admin");
    }
  };

  const superAdminProfileRef = useMemo(() => {
    if (!fetchingSuperAdminDetails && superAdminDetails) {
      return {
        current: (
          <div className="flex flex-col justify-center">
            <p className="text-right font-medium text-gray-700 capitalize text-lg">
              {superAdminDetails?.data.name}
            </p>
            <p className="text-right font-medium text-gray-700">
              {superAdminDetails?.data.email}
            </p>
          </div>
        ),
      };
    }
    return { current: null };
  }, [fetchingSuperAdminDetails, superAdminDetails]);

  return (
    <section className="min-h-full w-full">
      {/* Combined Grid Layout */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
        
        {/* 1. Total Tickets Assigned */}
        {ticketAssignUnassign.length > 0 && (() => {
           const detail = ticketAssignUnassign[0];
           const Icon = iconMap[detail.icon];
           return (
            <div
              key={detail.label}
              className="shadow-md bg-white/60 backdrop-blur-md border border-white/50 rounded-md flex justify-between p-5 w-full hover:shadow-lg hover:shadow-black/20 transition-all duration-300"
            >
              <div className="flex flex-col justify-between">
                <span className="font-bold text-gray-700">{detail.label}</span>
                <span className="text-2xl font-medium text-gray-700">
                  {detail.count}
                </span>
              </div>
              <div
                className={`w-16 h-16 flex justify-center items-center rounded-full ${detail.bgColor}`}
              >
                <Icon className={`size-8 ${detail.iconColor}`} />
              </div>
            </div>
           );
        })()}

        {/* 2. Total Tickets Unassigned */}
        {ticketAssignUnassign.length > 1 && (() => {
           const detail = ticketAssignUnassign[1];
           const Icon = iconMap[detail.icon];
           return (
            <div
              key={detail.label}
              className="shadow-md bg-white/60 backdrop-blur-md border border-white/50 rounded-md flex justify-between p-5 w-full hover:shadow-lg hover:shadow-black/20 transition-all duration-300"
            >
              <div className="flex flex-col justify-between">
                <span className="font-bold text-gray-700">{detail.label}</span>
                <span className="text-2xl font-medium text-gray-700">
                  {detail.count}
                </span>
              </div>
              <div
                className={`w-16 h-16 flex justify-center items-center rounded-full ${detail.bgColor}`}
              >
                <Icon className={`size-8 ${detail.iconColor}`} />
              </div>
            </div>
           );
        })()}

        {/* 3. Super Admin Profile Card */}
        <div className="shadow-md bg-white/60 backdrop-blur-md border border-white/50 rounded-md flex justify-between p-5 w-full hover:shadow-lg hover:shadow-black/20 transition-all duration-300">
             <div className="flex justify-center items-center">
               <UserIcon className="size-10" />
             </div>
             <div className="flex justify-end">
               {fetchingSuperAdminDetails ? (
                 <p>Fetching...</p>
               ) : (
                 superAdminProfileRef.current
               )}
             </div>
        </div>

        {/* 4, 5, 6. Open, In Process, Resolved */}
        {progressBarDetails.map((detail) => (
            <NavLink
              to={`/ticket/view?status=${detail.query}`}
              key={detail.label}
              className="shadow-md bg-white/60 backdrop-blur-md border border-white/50 rounded-md flex justify-between p-5 w-full hover:shadow-lg hover:shadow-black/20 transition-all duration-300"
            >
              <div className="flex flex-col justify-between">
                <span className="font-bold text-gray-700">{detail.label}</span>
                <span className="text-2xl font-medium text-gray-700">
                  {detail.count}
                </span>
              </div>
              <div className="w-16 h-16 font-bold">
                <CircularProgressbar
                  value={detail.percentage}
                  text={`${detail.percentage}%`}
                  styles={buildStyles({
                    pathColor: detail.pathColor,
                    textColor: detail.textColor,
                    textSize: "25px",
                  })}
                />
              </div>
            </NavLink>
        ))}

      </section>

      <section className="mt-5 flex flex-col gap-10">
            <div>
          <h2 className="text-xl font-medium mb-4 mt-8">Admins Overview</h2>
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setIsCreateAdminModalOpen(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Create Admin
            </button>
          </div>
          {fetchingAdminsList ? (
            <TableSkeleton />
          ) : (
            <TableWithPagination
              tableHeading={tableHeading}
              tableRowData={adminsTableData}
            />
          )}

          <h2 className="text-xl font-medium mb-4 mt-8">Users Overview</h2>
          {fetchingUsersList ? (
            <TableSkeleton />
          ) : (
            <TableWithPagination
              tableHeading={usersTableHeading}
              tableRowData={usersTableData}
            />
          )}
        </div>
      </section>

      <Dialog
        open={isCreateAdminModalOpen}
        onClose={() => setIsCreateAdminModalOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md rounded bg-white p-6 shadow-xl">
            <DialogTitle className="text-lg font-bold mb-4">Create Admin</DialogTitle>
            <form onSubmit={handleCreateAdmin}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                  value={newAdminData.name}
                  onChange={(e) => setNewAdminData({...newAdminData, name: e.target.value})}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                  value={newAdminData.email}
                  onChange={(e) => setNewAdminData({...newAdminData, email: e.target.value})}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                  value={newAdminData.password}
                  onChange={(e) => setNewAdminData({...newAdminData, password: e.target.value})}
                  required
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setIsCreateAdminModalOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreatingAdmin}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-300"
                >
                  {isCreatingAdmin ? "Creating..." : "Create"}
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </Dialog>
    </section>
  );
}
