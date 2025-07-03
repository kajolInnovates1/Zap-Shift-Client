import React from 'react';
import { useQuery } from '@tanstack/react-query';
import AxiosSecure from '../../../Hooks/AxiosSecure/AxiosSecure';
import useAuth from '../../../Hooks/UserAuth/UseAuth';

const MyTransaction = () => {
    const axiosSecure = AxiosSecure();
    const { user } = useAuth();

    const {
        data: transactions = [],
        isLoading,
        error,
    } = useQuery({
        queryKey: ['transactions', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/transactions?email=${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    if (isLoading)
        return <p className="text-center py-8 text-indigo-700 font-semibold">Loading transactions...</p>;

    if (error)
        return (
            <p className="text-center py-8 text-red-600 font-semibold">
                Error loading data: {error.message}
            </p>
        );

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">
                Transaction History
            </h2>
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto border-collapse">
                    <thead>
                        <tr className="bg-indigo-600 text-white uppercase text-sm tracking-wider">
                            <th className="border px-6 py-3 text-center">#</th>
                            <th className="border px-6 py-3 text-left">Parcel ID</th>
                            <th className="border px-6 py-3 text-right">Amount</th>
                            <th className="border px-6 py-3 text-left">Method</th>
                            <th className="border px-6 py-3 text-left">Transaction ID</th>
                            <th className="border px-6 py-3 text-center">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((trans, index) => (
                            <tr
                                key={trans._id}
                                className={`${index % 2 === 0 ? 'bg-indigo-50' : 'bg-white'
                                    } hover:bg-indigo-100 transition-colors duration-300 cursor-pointer`}
                            >
                                <td className="border px-6 py-3 text-center font-semibold text-indigo-700">
                                    {index + 1}
                                </td>
                                <td className="border px-6 py-3 break-words max-w-xs text-indigo-900 font-medium">
                                    {trans.parcelId}
                                </td>
                                <td className="border px-6 py-3 text-right font-semibold text-green-600">
                                    ${trans.amount}
                                </td>
                                <td className="border px-6 py-3 capitalize text-indigo-800">{trans.paymentMethod}</td>
                                <td className="border px-6 py-3 break-words text-indigo-700 text-xs">
                                    {trans.transactionId}
                                </td>
                                <td className="border px-6 py-3 text-center text-indigo-700 text-sm">
                                    {new Date(trans.date).toLocaleString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyTransaction;
