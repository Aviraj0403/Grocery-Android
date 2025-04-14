import React, { useState } from "react";
import Uploadcategorymodel from "../components/Uploadcategorymodel";

const Categorypage = () => {
    const[openUploadCategory,setopenUploadCategory] = useState(false);
  return (
    <section>
      <div className="p-2 bg-white shadow-md flex items-center justify-between">
        <h2 className="font-semibold">Category</h2>

        <button
        onClick={()=>setopenUploadCategory(true)}
          className="text-sm border border-green-500
             hover:bg-green-600 px-3 py-1 rounded text-green-500 hover:text-neutral-800">
          Add Category
        </button>
      </div>

      {
          openUploadCategory && (
              <Uploadcategorymodel close={()=>setopenUploadCategory(false)}/>
            )
      }

    </section>
  );
};

export default Categorypage;
