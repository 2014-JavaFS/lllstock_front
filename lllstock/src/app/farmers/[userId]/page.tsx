"use client";
import { useParams, useRouter } from "next/navigation";
import { NextPage } from "next";
import React, { useState, useEffect } from "react";
import { lllServer } from "@/utils/lllServer";
import type { Farmer } from "../../types/farmer";
interface patientIdentificationInfo {
    animalId: number;
    breed: string;
    age: number;
    sex: string;
    owner_info: string;
}

interface medicalHistoryInfo {
    previousIllnesses: string;
    previousTreatments: string;
    vaccinationHistory: string;
}

interface currentConditionInfo {
    examinationDate: string;
    clinicalSigns: string;
    diagnosis: string;
    diagnosticTests: string;
}

interface treatmentPlanInfo {
    medicationsPrescribed: string;
    antibiotics: string;
    treatmentProcedures: string;
    followupInstructions: string;
}

interface healthMonitoringInfo {
    monitoringSchedule: string;
    progressNotes: string;
}

interface recordKeepingInfo {
    vetDetails: string;
    recordDate: string;
    signature: string;
}

interface additionalNotesInfo {
    environmentalFactors: string;
    behavioralObservations: string;
}

interface livestockRecordInfo {
    entryId: number;
    ownerId: number;
    patientIdentification: patientIdentificationInfo;
    medicalHistory: medicalHistoryInfo;
    currentCondition: currentConditionInfo;
    treatmentPlan: treatmentPlanInfo;
    healthMonitoring: healthMonitoringInfo;
    recordKeeping: recordKeepingInfo;
    additionalNotes: additionalNotesInfo;
}

const Farmer: NextPage = () => {
    const params = useParams();
    const userId = params.userId;
    const router = useRouter();
    const [farmer, setFarmer] = useState<Farmer | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchFarmer = async () => {
            if(!userId || Array.isArray(userId)) {
                setError("Invalid user id");
                setLoading(false);
                router.push(`/error?statusCode=400&errorMessage=Invalid%20user%20id`);
                return;
            }

            try {
                const response = await lllServer.get<Farmer>(`/users/${userId}`,{
                    headers:{
                        'userId': userId.toString()
                    }
                });
                setFarmer(response.data);
            } catch (error) {
                console.error("Error fetching farmer data: ", error);
                setError("Error fetching farmer data");
                router.push(`/error?statusCode=500&errorMessage=Error%20fetching%20farmer%20data`);
            } finally {
                setLoading(false);
            }
        };

        fetchFarmer();
    }, [router, userId]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!farmer) {
        return <p>Farmer not found</p>;
    }

    return (
        <>
            <h1>Farmer Information</h1>
            <p>First Name: {farmer.firstName}</p>
            <p>Last Name: {farmer.lastName}</p>
            <p>Email: {farmer.email}</p>
        </>
    );
}
export default Farmer;
