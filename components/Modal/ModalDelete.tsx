import { XIcon } from "@heroicons/react/solid";
import supabase from "../../supabase";
import { Comicbook } from "../../types";

export default function ModalDelete ({
  changeDeleteModalState,
  bookToDelete
}: {
  changeDeleteModalState: Function;
  bookToDelete: Comicbook;
}) {
  function closeModal (): void {
    changeDeleteModalState(false);
  }

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-10">
      <div className="w-10/12 md:w-1/3 p-5 rounded-md bg-gray-100 z-30">
        <div className="flex justify-between items-center mb-5">
          <h3 className="uppercase">Delete {bookToDelete.title}</h3>
          <XIcon className="h-6 w-6 cursor-pointer" onClick={closeModal} />
        </div>
      </div>
    </div>
  );
}
