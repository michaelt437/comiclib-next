import { Fragment, useState } from "react";
import { Publishers } from "../../types";

export default function Combobox({
  publisherValue,
  publishers,
  updatePublisher
}: {
  publisherValue: Publishers | string;
  publishers: Publishers[],
  updatePublisher: Function 
}) {
  return (
    <Fragment>
      <div>
        <label htmlFor="publisher" className="block font-medium mb-1">
          Publisher
        </label>
        <input
          id="publisher"
          name="publisher"
          className="form-field w-full mb-5"
          value={publisherValue}
          placeholder="Enter a publisher"
          onChange={(event) => updatePublisher(event.target.value)}
        />
      </div>
    </Fragment>
  );
}
