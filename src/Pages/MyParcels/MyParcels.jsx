import React from 'react';
import AxiosSecure from '../../Hooks/AxiosSecure/AxiosSecure';
import useAuth from '../../Hooks/UserAuth/UseAuth';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const MyParcels = () => {
    const axiosSecure = AxiosSecure();
    const { user } = useAuth();
    const queryClient = useQueryClient();

    const { data: parcels = [], isLoading, isError, error, refetch } = useQuery({
        queryKey: ['parcels', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user.email}`);
            return res.data;
        }
    });

    const handleViewDetails = (parcel) => {

    };

    const handlePay = (parcel) => {

    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            try {
                await axiosSecure.delete(`/parcels/${id}`); // change base URL accordingly

                Swal.fire(
                    'Deleted!',
                    'Your parcel has been deleted.',
                    'success'
                );
                refetch();

                // TODO: refresh parcel list here (e.g., refetch or update state)
            } catch (error) {
                console.error("Delete failed:", error);
                Swal.fire(
                    'Error!',
                    'Failed to delete parcel.',
                    'error'
                );
            }
        }

    };

    if (isLoading) return <p className="text-center text-lg mt-10">Loading parcels...</p>;
    if (isError) return <p className="text-center text-red-600 mt-10">Error: {error.message}</p>;

    return (
        <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">My Parcels <span className="text-indigo-600">({parcels.length})</span></h1>

            {parcels.length === 0 ? (
                <p className="text-center text-gray-500 py-10">No parcels found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg shadow-sm">
                        <thead className="bg-indigo-600 text-white">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-semibold">Tracking ID</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold">Title</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold">Sender</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold">Receiver</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold">Cost</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold">Delivery Status</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold">Payment Status</th>
                                <th className="px-6 py-3 text-center text-sm font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {parcels.map(parcel => (
                                <tr key={parcel._id} className="hover:bg-indigo-50 transition duration-200">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-indigo-700">{parcel.tracking_id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold">{parcel.title}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                        <div>{parcel.senderName}</div>
                                        <div className="text-xs text-gray-500">{parcel.senderAddress}, {parcel.senderDistrict}, {parcel.senderRegion}</div>
                                        <div className="text-xs text-gray-400">Contact: {parcel.senderContact}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                        <div>{parcel.receiverName}</div>
                                        <div className="text-xs text-gray-500">{parcel.receiverAddress}, {parcel.receiverDistrict}, {parcel.receiverRegion}</div>
                                        <div className="text-xs text-gray-400">Contact: {parcel.receiverContact}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-indigo-600">{parcel.cost} ৳</td>
                                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${parcel.delivery_status === 'delivered' ? 'text-green-600' : 'text-yellow-600'
                                        }`}>
                                        {parcel.delivery_status.replace(/_/g, ' ')}
                                    </td>
                                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${parcel.payment_status === 'paid' ? 'text-green-600' : 'text-red-600'
                                        }`}>
                                        {parcel.payment_status.toUpperCase()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center space-x-2">
                                        <button
                                            onClick={() => handleViewDetails(parcel)}
                                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-md text-sm font-medium transition"
                                        >
                                            Details
                                        </button>
                                        {parcel.payment_status === "unpaid" && (
                                            <button
                                                onClick={() => handlePay(parcel)}
                                                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-sm font-medium transition"
                                            >
                                                Pay
                                            </button>
                                        )}
                                        <button
                                            onClick={() => handleDelete(parcel._id)}
                                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm font-medium transition"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MyParcels;
