import { useState, useEffect } from "react";

import api from "../services/api";

import "../styles/RawTelemetryViewer.css";

function RawTelemetryViewer() {

    const [data, setData] =
        useState(null);

    const [showData, setShowData] =
        useState(false);

    useEffect(() => {

        if (!showData) {

            return;

        }

        loadData();

        const interval =
            setInterval(
                loadData,
                5000
            );

        return () =>
            clearInterval(interval);

    }, [showData]);

    function toggleDataset() {

        setShowData(
            !showData
        );

    }

    async function loadData() {

        try {

            const response =
                await api.get(
                    "/telemetry/history"
                );

            setData(
                response.data
            );


        } catch (error) {

            console.error(error);

        }

    }

    return (

        <div className="raw-dataset-container">

            <h2 className="raw-dataset-title">
                📄 Raw Telemetry Dataset
            </h2>

            <button
                className="raw-dataset-button"
                onClick={toggleDataset}
            >

                {
                    showData
                        ? "Hide Raw Dataset"
                        : "View Raw Dataset"
                }

            </button>

            {
                showData
                &&
                data
                &&
                (

                    <>

                        <p className="raw-dataset-info">

                            Showing latest 20 records • Total Records: {data.length}

                        </p>

                        <pre className="raw-dataset-content">

                            {
                                JSON.stringify(
                                    data.slice(-20),
                                    null,
                                    2
                                )
                            }

                        </pre>

                    </>

                )
            }

        </div>

    );

}

export default RawTelemetryViewer;