import { XIcon } from "@heroicons/react/solid";

export default function Modal({
  changeModalState
}: {
  changeModalState: Function;
}) {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-10">
      <div className="w-10/12 md:w-1/3 p-5 rounded-md bg-gray-100 z-30">
        <div className="flex justify-between items-center mb-5">
          <h3 className="uppercase">Add a new comic book</h3>
          <XIcon
            className="h-6 w-6 cursor-pointer"
            onClick={() => changeModalState(false)}
          />
        </div>
        <div className="form">
          <label htmlFor="title" className="block font-medium mb-1">
            Title*
          </label>
          <input
            className="form-field w-full mb-5"
            type="text"
            id="title"
            name="title"
            placeholder="Enter the title"
          />
          <label htmlFor="publisher" className="block font-medium mb-1">
            Publisher*
          </label>
          <select
            className="form-field w-full mb-5"
            id="publisher"
            name="publisher"
          >
            <option selected disabled hidden>
              Select a publisher
            </option>
            <option value="marvel">Marvel</option>
            <option value="dc">DC</option>
            <option value="dc black label">DC Black Label</option>
            <option value="vertigo">Vertigo</option>
            <option value="image">Image</option>
            <option value="dark horse">Dark Horse</option>
            <option value="idw">IDW</option>
            <option value="boom studios">Boom Studios</option>
          </select>
          <label htmlFor="writer" className="block font-medium mb-1">
            Writer
          </label>
          <input
            className="form-field w-full mb-5"
            type="text"
            id="writer"
            name="writer"
            placeholder="Enter the writer(s)"
          />
          <label htmlFor="score" className="block font-medium mb-1">
            Score{" "}
            <span className="text-gray-400 font-normal">(0 is no score)</span>
          </label>
          <input
            className="form-field mb-5"
            type="number"
            id="score"
            name="score"
            min="0"
            max="10"
            placeholder="0"
          />
          <div className="flex justify-end">
            <button className="btn secondary">Cancel</button>
            <button className="btn primary">Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
}
