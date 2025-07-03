import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';
import { useParams } from 'react-router';
import AxiosSecure from '../../../Hooks/AxiosSecure/AxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../Hooks/UserAuth/UseAuth';

const PaymentForm = () => {
    const [cardError, setCardError] = useState('');
    const [success, setSuccess] = useState('');
    const [processing, setProcessing] = useState(false);
    const { user } = useAuth();

    const { parcelId } = useParams();
    const axiosSecure = AxiosSecure();
    const stripe = useStripe();
    const elements = useElements();

    const { data: parcel = {}, isLoading, isError, error: queryError } = useQuery({
        queryKey: ['parcels', parcelId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/${parcelId}`);
            return res.data;
        },
        enabled: !!parcelId,
    });

    const amount = parcel?.cost;
    const amountParcel = amount * 1000; // adjust as needed for currency smallest unit

    if (isLoading) return <p>Loading parcel info...</p>;
    if (isError) return <p>Error loading parcel: {queryError.message}</p>;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setCardError('');
        setSuccess('');
        setProcessing(true);

        if (!stripe || !elements) return;

        const cardElement = elements.getElement(CardElement);
        if (!cardElement) return;

        try {
            // 1. Create PaymentIntent
            const response = await axiosSecure.post(`/create-payment-intent`, {
                amountParcel,
                parcelId,
            });
            const clientSecret = response.data.clientSecret;

            // 2. Confirm payment
            const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                    billing_details: {
                        name: 'Test User',
                    },
                },
            });

            if (error) {
                console.error('Payment failed:', error);
                setCardError(error.message);
            } else if (paymentIntent.status === 'succeeded') {
                setSuccess('Payment successful!');
                console.log('PaymentIntent:', paymentIntent);
                const transactionData = {
                    parcelId,
                    email: user.email, // Replace with actual logged-in user's email
                    amount,
                    paymentMethod: paymentIntent.payment_method_types[0], // usually 'card'
                    transactionId: paymentIntent.id
                };
                console.log(transactionData);

                try {
                    const res = await axiosSecure.post('/transactions', transactionData);
                    if (res.data.transactionId) {
                        console.log('Transaction saved and parcel updated:', res.data);
                        // Optionally show a toast/success message
                    } else {
                        console.warn('Transaction saved but parcel update failed');
                    }
                } catch (err) {
                    console.error('Failed to save transaction:', err);
                    setCardError('Payment succeeded but failed to save transaction info.');
                }




            }
        } catch (err) {
            console.error(err);
            setCardError('Something went wrong while processing payment.');
        }

        setProcessing(false);
    };

    return (
        <div className="max-w-xl mx-auto p-6">
            <p className="text-lg mb-4">Total to pay: <strong>${parcel.cost}</strong></p>

            <form onSubmit={handleSubmit} className="space-y-4">
                <CardElement className="p-4 border border-gray-300 rounded" />
                <button className="btn btn-primary" type="submit" disabled={!stripe || processing}>
                    {processing ? 'Processing...' : `Pay $${parcel.cost}`}
                </button>
            </form>

            {cardError && <p className="text-red-500 mt-2">{cardError}</p>}
            {success && <p className="text-green-600 mt-2">{success}</p>}
        </div>
    );
};

export default PaymentForm;
