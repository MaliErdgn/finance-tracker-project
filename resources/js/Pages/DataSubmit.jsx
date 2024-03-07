import React, { useEffect, useState } from "react";
import axios from "axios";
import "../bootstrap.js";
import Button from 'react-bootstrap/Button';
import EditExpInc from "@/Components/EditExpInc.jsx";
import ExpenseIncomeForm from "@/Components/ExpenseIncomeForm.jsx";

const DataSubmit = () => {


    const handleEditData = (id) => {
        console.log("Editing balance with ID:", id);
        setSelectedBalanceId(id);
        // Additional logic if needed
    };


    return (
        <div>
        <ExpenseIncomeForm/>


        {/* {selectedBalanceId && (
        <EditExpInc
            formData={data.find(item => item.id === selectedBalanceId)}
            categories={categories}
            filteredTags={allTags}
            methods={methods}
            onCancel={() => setSelectedBalanceId(null)}
        />
        )} */}



        </div>
    )
}

export default DataSubmit;
