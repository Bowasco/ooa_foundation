"use client";

import RecipientTable from "../components/RecipientTable";
import StatsCards from "../components/StatsCards";

export default function Page() {
  return (
    <>
      <main className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-[40px] font-bold mb-2">Admin Dashboard</h1>
          <p className="text-gray-600 mb-6">
            Overview of registered recipients
          </p>

          <StatsCards />

          <div className="mt-10 bg-white rounded-xl shadow p-4">
            <h2 className="text-xl font-semibold mb-4">
              Registered Recipients
            </h2>
            <RecipientTable />
          </div>
        </div>
      </main>
    </>
  );
}

<div className=" w-[90%] m-auto">
  <div className="flex items-center gap-3 mb-6 mt-8">
    <button className="text-gray-600 hover:text-gray-900">
      <FiChevronLeft size={24} />
    </button>
    <h1 className="text-xl font-semibold text-gray-900">Booking summary</h1>
  </div>
  {/* Error Message */}
  {errorMessage && (
    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
      <svg
        className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
          clipRule="evenodd"
        />
      </svg>
      <div className="flex-1">
        <h4 className="font-semibold text-red-800 mb-1">Payment Failed</h4>
        <p className="text-sm text-red-700">{errorMessage}</p>
      </div>
      <button
        onClick={() => setErrorMessage("")}
        className="text-red-600 hover:text-red-800"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  )}

  <div className="grid grid-cols-2 gap-8">
    <div className="space-y-8">
      <div className="shadow-sm p-6 rounded-[16px] space-y-6">
        <div className="flex items-start gap-4">
          <div className="relative">
            <img
              src={providerDetails?.profilePicture || bookingCar}
              alt={providerDetails?.fullName || "Provider"}
              className="w-16 h-16 rounded-full object-cover"
              onError={(e) => {
                e.target.src = bookingCar;
              }}
            />
          </div>
          <div className="flex-grow">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-lg font-semibold text-gray-900">
                {providerDetails?.fullName || "Provider"}
              </h2>
              <span className="text-[#8BC53F]">
                <BadgeCheck className="w-[20px] h-[20px]" />
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-1">
              {providerDetails?.services?.[0]?.title?.replace(/_/g, " ") ||
                bookingDetails?.subCategory?.replace(/_/g, " ") ||
                "—"}
            </p>
            <div className="flex items-center gap-1 text-[14px] text-gray-600">
              <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
              <span className="font-medium text-gray-900">
                {providerDetails?.rating?.average > 0
                  ? providerDetails.rating.average.toFixed(1)
                  : "New"}
              </span>
              <span className="text-gray-500">
                ({providerDetails?.rating?.count ?? 0} reviews)
              </span>
            </div>
            <div className="flex items-center gap-1 text-[14px] text-[#231F20BF] mt-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>
                {providerDetails?.distance?.toFixed(1) ?? "—"} miles away
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-10">
            <div className="flex flex-col justify-center items-center">
              <div className="flex items-center justify-center w-10 h-10 rounded-full">
                <Award className="w-[24px] h-[24px] text-[#005823]" />
              </div>
              <div className="text-[20px] font-semibold text-[#231F20]">
                {providerDetails?.completedJobs ?? 0}
              </div>
              <div className="text-[15px] text-[#231F2080]">Jobs Done</div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <div className="flex items-center justify-center w-10 h-10">
                <Clock className="w-[24px] h-[24px] text-[#231F20BF]" />
              </div>
              <div className="text-[20px] font-semibold text-[#231F20]">
                {"< 3 Mins"}
              </div>
              <div className="text-[15px] text-[#231F2080]">Response Time</div>
            </div>
            {/* <div className="text-center">
                    <div className="flex items-center justify-center w-10 h-10">
                      <Star className="w-[24px] h-[24px] text-yellow-400" />
                    </div>
                    <div className="text-[20px] font-semibold text-[#231F20]">
                      {providerDetails?.rating?.average > 0
                        ? providerDetails.rating.average.toFixed(1)
                        : "New"}
                    </div>
                    <div className="text-[16px] text-[#231F2080]">Rating</div>
                  </div> */}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-5">
          <button className="flex-1 flex items-center justify-center gap-2 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Phone className="w-4 h-4 text-gray-600" />
            <span className="font-medium text-gray-700">Call</span>
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <MessageCircle className="w-4 h-4 text-gray-600" />
            <span className="font-medium text-gray-700">Message</span>
          </button>
          <button className="text-red-500 font-medium px-4 hover:text-red-600 transition-colors">
            Cancel Request
          </button>
        </div>
      </div>

      {/* Vehicle Image */}
      <img
        src={bookingCar}
        alt="Vehicle"
        className="w-full h-auto object-contain"
      />
    </div>

    <div className="space-y-4">
      <div className="bg-[#231F2005] border border-[#231F201A] px-6 py-4 rounded-[16px]">
        <div>
          <h3 className="text-[24px] font-bold text-[#231F20] mb-4">
            Job Summary
          </h3>

          <div className="space-y-3">
            {/* Pickup */}
            <div className="flex gap-3">
              <div className="w-10 h-10 bg-[#E6EFE9] rounded-full flex items-center justify-center flex-shrink-0">
                <div className="w-5 h-5 bg-[#005823] rounded-full" />
              </div>
              <div>
                <div className="font-semibold text-[16px] text-[#231F20]">
                  Pickup Location
                </div>
                <div className="text-[16px] text-[#231F20BF]">
                  {pickupAddress}
                </div>
              </div>
            </div>

            {/* Dropoff */}
            <div className="flex gap-3">
              <div className="w-10 h-10 bg-[#E6EFE9] rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-[#005823]" />
              </div>
              <div>
                <div className="font-semibold text-[16px] text-[#231F20]">
                  Dropoff Location
                </div>
                <div className="text-[16px] text-[#231F20BF]">
                  {dropoffAddress}
                </div>
              </div>
            </div>

            {/* Distance */}
            <div className="flex gap-3">
              <div className="w-10 h-10 bg-[#E6EFE9] rounded-full flex items-center justify-center flex-shrink-0">
                <Navigation className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="font-semibold text-[16px] text-[#231F20]">
                  Estimated Distance
                </div>
                <div className="text-[16px] text-[#231F20BF]">
                  {estimatedDistance}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cost */}
        <div className="my-6 border-t border-b border-[#231F201A] py-10">
          <h3 className="text-[20px] font-semibold text-gray-900 mb-4">Cost</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-[16px] font-semibold text-[#231F20BF]">
              <span>Service Cost</span>
              <span>{formatCurrency(serviceCost)}</span>
            </div>
            <div className="flex justify-between text-[16px] font-semibold text-[#231F20BF]">
              <span>Service Charge (2%)</span>
              <span>{formatCurrency(serviceCharge)}</span>
            </div>
            <div className="pt-2 mt-2 text-[16px]">
              <div className="flex justify-between">
                <span className="font-semibold text-[#231F20BF]">
                  Total Amount
                </span>
                <span className="font-semibold text-[#005823]">
                  {formatCurrency(totalAmount)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="mb-6">
          <h3 className="text-[20px] font-semibold text-[#231F20] mb-4">
            Payment Method
          </h3>
          <div className="space-y-3">
            <label
              className={`flex items-center gap-3 p-3 border rounded-[8px] cursor-pointer transition-colors ${selectedPayment === "wallet" ? "border-[#005823] bg-[#00582305]" : "border-[#231F2040] hover:bg-gray-50"}`}
            >
              <input
                type="radio"
                name="payment"
                value="wallet"
                checked={selectedPayment === "wallet"}
                onChange={(e) => setSelectedPayment(e.target.value)}
                className="w-5 h-5 accent-[#005823]"
              />
              <div className="flex items-center gap-3 flex-grow">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-[16px] text-[#231F20]">
                    Wallet
                  </div>
                  <div className="text-[12px] font-semibold text-[#231F20BF]">
                    Balance: {formatCurrency(walletBalance)}
                  </div>
                </div>
              </div>
            </label>

            <label
              className={`flex items-center gap-3 p-3 border rounded-[8px] cursor-pointer transition-colors ${selectedPayment === "online" ? "border-[#005823] bg-[#00582305]" : "border-[#231F2040] hover:bg-gray-50"}`}
            >
              <input
                type="radio"
                name="payment"
                value="online"
                checked={selectedPayment === "online"}
                onChange={(e) => setSelectedPayment(e.target.value)}
                className="w-5 h-5 accent-[#005823]"
              />
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="font-medium text-[16px] text-[#231F20]">
                  Pay Online
                </div>
              </div>
            </label>
          </div>
        </div>

        {/* Additional Notes */}
        <div className="mb-6">
          <h3 className="text-[20px] font-semibold text-[#231F20] mb-3">
            Pickup notes{" "}
            <span className="text-[16px] text-[#231F20BF]">(optional)</span>
          </h3>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add extra instructions for the service provider.."
            className="w-full p-4 border-2 border-gray-200 bg-[#fbfbfb] rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            rows="4"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pb-6">
          <button className="flex-1 py-4 px-6 text-[16px] bg-[#fbfbfb] border border-gray-300 rounded-[4px] text-[#231F20] font-semibold hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button
            onClick={handleConfirmAndPay}
            disabled={isProcessing}
            className="flex-1 py-4 px-6 text-[16px] bg-[#005823CC] text-white rounded-[4px] font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing
              ? "Processing..."
              : `Confirm & Pay ${formatCurrency(totalAmount)}`}
          </button>
        </div>
      </div>
      <p className="text-center text-[#231F2080]">
        Rider will proceed once payment is confirmed
      </p>
    </div>
  </div>
</div>;
