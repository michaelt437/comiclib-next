export default function Modal () {
    return (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-10">
            <div className="w-10/12 md:w-1/3 p-5 rounded-md bg-gray-200 z-30">
                <h3 className="mb-8 uppercase">Add a new comic book</h3>
                <form>
                    <label htmlFor="title" className="block font-medium mb-1">
                        Title
                    </label>
                    <input className="w-full px-3 py-2 rounded-md mb-5" type="text" id="title" name="title" placeholder="Enter the title"/>
                    <label htmlFor="writer" className="block font-medium mb-1">
                        Writer
                    </label>
                    <input className="w-full px-3 py-2 rounded-md mb-5" type="text" id="writer" name="writer" placeholder="Enter the writer(s)"/>
                    <label htmlFor="publisher" className="block font-medium mb-1">
                        Publisher
                    </label>
                    <input className="w-full px-3 py-2 rounded-md mb-5" type="text" id="publisher" name="publisher" placeholder="Enter the publisher"/>
                    <button className="btn bg-sky-500 text-gray-200 float-right">Submit</button>
                    <button className="btn bg-gray-300 hover:bg-gray-500 active:bg-gray-400 float-right">Cancel</button>
                </form>
            </div>
        </div>
    );
}