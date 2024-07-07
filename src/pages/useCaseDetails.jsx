import { PaperClipIcon } from "@heroicons/react/20/solid";

export default function useCaseDetails() {
  return (
    <div>
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">
          Customer Revenue prediction
        </h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          Finding the most valuable customers, by scaling customer engagement
          and reducing ‘the cost of visits.
        </p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Use Case Name
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              Customer Revenue prediction
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Use Case Type
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              Revenue Prediction Model
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
              In Q1 2023, sales team of FCP generated 1.5M euros making use of
              the model, by bringing human touch and machine intelligence,
              together
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">How</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              The first ever machine learning model in production, meaning we
              have a model that predicts and keeps learning from the hit/miss
              rates of its predictions
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Value in Euros
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              €5M per year revenue
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Value Description
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              The revenue growth potential is estimated to be over EUR5m per
              year, as we reduce the amount of unsuccessful visits and increase
              the hit rate of the sales people.
            </dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Power BI
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <a
                href="http://app.powerbi.com/revenuepredictionreport"
                className="text-indigo-600 hover:text-indigo-500"
              >
                http://app.powerbi.com/revenuepredictionreport
              </a>
            </dd>
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
                  Lampros Chortarias
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  D&A Contact
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  Mayank Srivastava
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Domain
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  Supply Chain - Plan & Logistics
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
