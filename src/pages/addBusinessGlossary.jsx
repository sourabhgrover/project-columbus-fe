import { useEffect } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import PropTypes from "prop-types";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import { saveGlossaryEntry } from "../rtk/businessGlossarySlice";



const Button = ({ onClick, children, className }) => (
  <button
    type="button"
    onClick={onClick}
    className={`${className} inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm`}
  >
    {children}
  </button>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string.isRequired,
};

export default function GlossaryDialog({ open, setOpen }) {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const { domains } = useSelector((state) => state.domains);
  const { saveStatus, error } = useSelector((state) => state.businessGlossary);

  const handleClose = () => {
    reset();
    setOpen(false);
  };

  useEffect(() => {
    if (saveStatus === 'succeeded') {
      toast.success('Glossary entry saved successfully!');
      reset();
      setOpen(false);
    } else if (saveStatus === 'failed') {
      toast.error(`Error: ${error}`);
    }
  }, [saveStatus, error, reset, setOpen]);

  const onSubmit = (data) => {
    dispatch(saveGlossaryEntry(data));
  };


  return (
    <Dialog
      open={open}
      onClose={setOpen}
      className="relative z-10"
      aria-labelledby="dialog-title"
    >
      <DialogBackdrop className="fixed inset-0 bg-gray-500/75 transition-opacity" />
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
            <h2 id="dialog-title" className="sr-only">
              Glossary Dialog
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label
                  htmlFor="glossaryname"
                  className="block text-sm font-medium text-gray-900"
                >
                  Business Glossary Name
                </label>
                <div className="mt-2">
                  <input
                    id="glossaryName"
                    placeholder="Provide a name for your business glossary"
                    {...register("glossaryName", {
                      required: "Glossary name is required",
                    })}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-gray-300 focus:outline-indigo-600 sm:text-sm"
                  />
                  {errors.glossaryName && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.glossaryName.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm/6 font-medium text-gray-900 mt-5"
                  >
                    Description
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="dataSteward"
                      {...register("dataSteward", {
                        required: "Description is required",
                      })}
                      rows={4}
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      placeholder="Provide a description for business glossary. For instance, purpose of the business glossary, intended usage etc."
                    />
                    {errors.description && (
                      <p className="mt-2 text-sm text-red-600">
                        {errors.description.message}
                      </p>
                    )}
                  </div>
                </div>
                <label
                  htmlFor="domain"
                  className="block text-sm font-medium text-gray-900 mt-5"
                >
                  Domain
                </label>
                <div className="relative mt-2">
                  <select
                    id="domainId"
                    {...register("domainId", { required: "Domain is required" })}
                    className="block w-full rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline-gray-300 focus:outline-indigo-600 sm:text-sm"
                  >
                    {domains.map((domain) => (
                      <option key={domain._id} value={domain._id}>
                        {domain.domainName}
                      </option>
                    ))}
                  </select>
                  <ChevronDownIcon
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500"
                    aria-hidden="true"
                  />
                </div>
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                {/* <Button
                onClick={handleClose}
                className="bg-indigo-600 text-white hover:bg-indigo-500 sm:col-start-2"
              >
                Save
              </Button> */}
                <button
                  type="submit"
                  className="bg-indigo-600 text-white hover:bg-indigo-500 sm:col-start-2"
                >
                  Submit
                </button>
                <Button
                  onClick={handleClose}
                  className="bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

// Validate props for the GlossaryDialog component
GlossaryDialog.propTypes = {
  open: PropTypes.bool.isRequired, // Ensures `open` is a required boolean
  setOpen: PropTypes.func.isRequired, // Ensures `setOpen` is a required function
};
