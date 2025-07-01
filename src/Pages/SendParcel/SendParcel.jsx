import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/UserAuth/UseAuth";
import AxiosSecure from "../../Hooks/AxiosSecure/AxiosSecure";

const AddParcel = () => {
    const regionData = useLoaderData();
    const { user } = useAuth();
    const axiosSecure = AxiosSecure();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const [senderDistricts, setSenderDistricts] = useState([]);
    const [receiverDistricts, setReceiverDistricts] = useState([]);
    const [cost, setCost] = useState(null);
    const [confirming, setConfirming] = useState(false);

    const watchFields = watch();

    useEffect(() => {
        if (watchFields.senderRegion) {
            const districts = regionData.filter(r => r.region === watchFields.senderRegion);
            setSenderDistricts(districts);
        }
        if (watchFields.receiverRegion) {
            const districts = regionData.filter(r => r.region === watchFields.receiverRegion);
            setReceiverDistricts(districts);
        }
    }, [watchFields.senderRegion, watchFields.receiverRegion]);

    useEffect(() => {
        const { type, weight, senderDistrict, receiverDistrict } = watchFields;
        if (type && senderDistrict && receiverDistrict) {
            const w = parseFloat(weight) || 0;
            const isSame = senderDistrict === receiverDistrict;

            let calculatedCost = 0;

            if (type === "document") {
                calculatedCost = isSame ? 60 : 80;
            } else if (type === "non-document") {
                if (w <= 3) {
                    calculatedCost = isSame ? 110 : 150;
                } else {
                    const base = isSame ? 110 : 150;
                    const extra = (w - 3) * 40 + (isSame ? 0 : 40);
                    calculatedCost = base + extra;
                }
            }
            setCost(calculatedCost);
        }
    }, [watchFields.type, watchFields.weight, watchFields.senderDistrict, watchFields.receiverDistrict]);

    // ✅ Tracking ID generator
    const generateTrackingId = () => {
        const num = Math.floor(1000 + Math.random() * 9000);
        const str = Math.random().toString(36).substring(2, 6).toUpperCase();
        return `TRK-${num}${str}`;
    };

    const onSubmit = () => {
        if (!cost) return toast.error("Cost calculation failed");

        Swal.fire({
            title: `Delivery Cost: ৳${cost}`,
            text: "Do you want to proceed to payment or edit the form?",
            icon: "info",
            showCancelButton: true,
            confirmButtonText: "Proceed to Payment",
            cancelButtonText: "Go Back & Edit",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
        }).then((result) => {
            if (result.isConfirmed) {
                setConfirming(true);
            } else {
                toast("You can continue editing the form.");
            }
        });
    };

    const handleConfirm = () => {
        const trackingId = generateTrackingId();

        const parcelData = {
            ...watchFields,
            created_by: user?.email,
            delivery_status: 'not_collected',
            payment_status: 'unpaid',
            tracking_id: trackingId,
            cost,
            creation_date: new Date().toISOString(),
        };
        axiosSecure.post("/parcels", parcelData).then(res => {
            if (res.data.insertedId) {
                Swal.fire({
                    title: "Parcel Confirmed!",
                    html: `Your Tracking ID is <strong>${trackingId}</strong>`,
                    icon: "success",
                    confirmButtonText: "OK",
                });

            }
        });
        toast.success("Parcel Info Saved!");



        setConfirming(false);
    };

    return (
        <div className="p-6 max-w-5xl mx-auto bg-white rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold mb-4 text-center text-primary">Add Parcel</h2>
            <p className="mb-8 text-gray-600 text-center">Fill in all required information to proceed</p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Parcel Info */}
                <div className="bg-gray-50 p-6 rounded-lg border">
                    <h3 className="font-semibold text-lg mb-4">Parcel Info</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex gap-4 items-center">
                            <label className="label cursor-pointer">
                                <input type="radio" value="document" {...register("type", { required: true })} className="radio radio-sm" /> <span className="ml-2">Document</span>
                            </label>
                            <label className="label cursor-pointer">
                                <input type="radio" value="non-document" {...register("type", { required: true })} className="radio radio-sm" /> <span className="ml-2">Non-Document</span>
                            </label>
                        </div>
                        <input {...register("title", { required: true })} placeholder="Parcel Title" className="input input-bordered w-full" />
                        <input
                            {...register("weight")}
                            placeholder="Weight (kg)"
                            type="number"
                            step="0.1"
                            disabled={watchFields.type !== "non-document"}
                            className="input input-bordered w-full"
                        />
                    </div>
                </div>

                {/* Sender and Receiver */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Sender Info */}
                    <div className="bg-gray-50 p-6 rounded-lg border">
                        <h3 className="font-semibold text-lg mb-4">Sender Info</h3>
                        <div className="space-y-3">
                            <input defaultValue={user?.name} {...register("senderName", { required: true })} className="input input-bordered w-full" placeholder="Sender Name" />
                            <input {...register("senderContact", { required: true })} placeholder="Contact Number" className="input input-bordered w-full" />
                            <select {...register("senderRegion", { required: true })} className="select select-bordered w-full">
                                <option value="">Select Region</option>
                                {[...new Set(regionData.map(r => r.region))].map(region => (
                                    <option key={region} value={region}>{region}</option>
                                ))}
                            </select>
                            <select {...register("senderDistrict", { required: true })} className="select select-bordered w-full">
                                <option value="">Select District</option>
                                {senderDistricts.map(d => (
                                    <option key={d.district} value={d.district}>{d.district}</option>
                                ))}
                            </select>
                            <input {...register("senderAddress", { required: true })} placeholder="Address" className="input input-bordered w-full" />
                            <input {...register("pickupInstruction", { required: true })} placeholder="Pick-up Instruction" className="input input-bordered w-full" />
                        </div>
                    </div>

                    {/* Receiver Info */}
                    <div className="bg-gray-50 p-6 rounded-lg border">
                        <h3 className="font-semibold text-lg mb-4">Receiver Info</h3>
                        <div className="space-y-3">
                            <input {...register("receiverName", { required: true })} placeholder="Receiver Name" className="input input-bordered w-full" />
                            <input {...register("receiverContact", { required: true })} placeholder="Contact Number" className="input input-bordered w-full" />
                            <select {...register("receiverRegion", { required: true })} className="select select-bordered w-full">
                                <option value="">Select Region</option>
                                {[...new Set(regionData.map(r => r.region))].map(region => (
                                    <option key={region} value={region}>{region}</option>
                                ))}
                            </select>
                            <select {...register("receiverDistrict", { required: true })} className="select select-bordered w-full">
                                <option value="">Select District</option>
                                {receiverDistricts.map(d => (
                                    <option key={d.district} value={d.district}>{d.district}</option>
                                ))}
                            </select>
                            <input {...register("receiverAddress", { required: true })} placeholder="Address" className="input input-bordered w-full" />
                            <input {...register("deliveryInstruction", { required: true })} placeholder="Delivery Instruction" className="input input-bordered w-full" />
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                    <button type="submit" className="btn btn-primary w-full md:w-auto">Submit</button>
                    {confirming && (
                        <button type="button" onClick={handleConfirm} className="btn btn-success w-full md:w-auto">
                            Confirm
                        </button>
                    )}
                </div>
            </form>

            {cost !== null && (
                <div className="mt-6 text-center alert alert-info">
                    Estimated Delivery Cost: <strong>৳{cost}</strong>
                </div>
            )}
        </div>
    );
};

export default AddParcel;
