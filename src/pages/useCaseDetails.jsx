import React from "react";
import { PaperClipIcon } from "@heroicons/react/20/solid";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchUseCase } from "../rtk/useCase";

export default function useCaseDetails() {

  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    // Dispatch action to fetch data
    dispatch(fetchUseCase());
  }, []);
  const {data} = useSelector((state) => state.useCase);
    let selectedUseCase = data.find((useCase) => useCase._id === id);
    console.log(selectedUseCase);
    
  return (
    <div>
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">
          {/* Customer Revenue prediction */}
          {selectedUseCase?.useCaseName}
        </h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          {/* Finding the most valuable customers, by scaling customer engagement
          and reducing ‘the cost of visits. */}
          {selectedUseCase?.description}
        </p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Use Case Name
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            {selectedUseCase?.useCaseName}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Use Case Type
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            {selectedUseCase?.useCaseType}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              What
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              Drive market penetration with ‘revenue potential predictions’ of
              hotels, restaurants and cafes
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Why</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            {selectedUseCase?.businessValue}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">How</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            {selectedUseCase?.deliveryMethod}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Value in Euros
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            {selectedUseCase?.valueInEuros}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Value Description
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            {selectedUseCase?.valueDescription}
            </dd>
          </div>
             {/* This section will be dynaminc in future  */}
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            {selectedUseCase?.links.map((link) => (
              <React.Fragment key={link._id}>
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  {link?.linkType}
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <a
                    href={link?.link}
                    className="text-indigo-600 hover:text-indigo-500"
                  >
                    {link?.link}
                  </a>
                </dd>
                </React.Fragment>
            ))}
          </div>
         <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
  <div className="px-4 sm:px-0">
    <h2 className="text-base font-semibold leading-7 text-gray-900">
      Attachments
    </h2>
    <p className="mt-1 text-sm leading-6 text-gray-600">
      Download relevant attachments for the use case.
    </p>
  </div>
  <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
    <div className="px-4 py-6 sm:p-8">
      <ul
        role="list"
        className="divide-y divide-gray-100 rounded-md border border-gray-200"
      >
        <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
          <div className="flex w-0 flex-1 items-center">
            <PaperClipIcon
              aria-hidden="true"
              className="h-5 w-5 flex-shrink-0 text-gray-400"
            />
            <div className="ml-4 flex min-w-0 flex-1 gap-2">
              <span className="truncate font-medium">
                businesscase.pdf
              </span>
              <span className="flex-shrink-0 text-gray-400">2.4mb</span>
            </div>
          </div>
          <div className="ml-4 flex-shrink-0">
            <a
              href="#"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Download
            </a>
          </div>
        </li>
        <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
          <div className="flex w-0 flex-1 items-center">
            <PaperClipIcon
              aria-hidden="true"
              className="h-5 w-5 flex-shrink-0 text-gray-400"
            />
            <div className="ml-4 flex min-w-0 flex-1 gap-2">
              <span className="truncate font-medium">
                usecasedetails.pdf
              </span>
              <span className="flex-shrink-0 text-gray-400">4.5mb</span>
            </div>
          </div>
          <div className="ml-4 flex-shrink-0">
            <a
              href="#"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Download
            </a>
          </div>
        </li>
      </ul>
    </div>
  </div>
</div>
        </dl>
      </div>
      <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
        <div className="px-4 sm:px-0">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Contact Information
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Contact details of Business and IT who can be contacted in
            case of questions or clarifications about the use case.
          </p>
        </div>
        <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
          <div className="px-4 py-6 sm:p-8">
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Business Contact
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {selectedUseCase?.businessContact}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  D&A Contact
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {selectedUseCase?.dataAndAnalyticsContact}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Domain
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {selectedUseCase?.domain}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
