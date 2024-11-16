import React, { useCallback, useState } from 'react'
import Papa from 'papaparse';
import { useNavigate } from 'react-router-dom';
import { useRosterHook } from '../apiHooks/useRosterHook/useRosterHook';
import { useSelector } from 'react-redux';

export const useRosterImport = ({ setModalOpen }: {
    setModalOpen: any
}) => {
    const [selectedFile, setSelectedFile] = useState<string | null>(null);
    const [fileData, setFileData] = useState<any[]>([]);
    const [isValidCSV, setIsValidCSV] = useState<boolean | null>(true);
    const [showErrorOnce, setShowErrorOnce] = useState<boolean | null>(null);
    const [summaryMap, setSummaryMap] = useState<Map<string, number>>(new Map()); // Map to hold position counts
    const [formData, setFormData] = useState<FormData | null>();
    const [dataLoading, setDataLoading] = useState<boolean>(false);
    const roasterData = useSelector((state: any) => state.app.roasterDetails) || [];

    const navigate = useNavigate();

    const { fetchRoasterData, loading } = useRosterHook();

    const handleImportClicked = useCallback(async () => {
        setDataLoading(true);
        try{
        await fetch(`${process.env.REACT_APP_API_ENDPOINT}/file`, {
            method: "POST",
            body: formData, // FormData already contains the file
        })
            .then((res) => res.json())
            .then(async (res) => {
                console.log(res);
                setModalOpen(false);
                await fetchRoasterData();
                setFileData([]);
                setSelectedFile(null)
                setSummaryMap(new Map());
                setIsValidCSV(null);
                setShowErrorOnce(null);
                navigate('/');
                console.log('roaster imported updated successfully')
            })
            .catch((err) => {
                console.error("Error:", err);
            }).finally(() => {
                setDataLoading(false);
            });
        }
        catch{
            
        }
    }, [formData])
    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            console.log(file)
            let formData = new FormData();
            formData.append("file", file);
            console.log(formData)
            setSelectedFile(file.name);
            setFormData(formData);
            const reader = new FileReader();
            reader.onload = (e) => {
                const csvData = e.target?.result;
                if (csvData) {
                    Papa.parse(csvData as string, {
                        header: true,
                        skipEmptyLines: true,
                        complete: (result: any) => {
                            const data = result.data;
                            console.log(data);
                            let newSummaryMap = new Map<string, number>();
                            newSummaryMap.set('Total Player', result.data.length);
                            result.data.forEach((item: any) => {
                                const position = item?.Position;
                                if (position) {
                                    newSummaryMap.set(position, (newSummaryMap.get(position) || 0) + 1);
                                }
                            });
                            setFileData(data);
                            setSummaryMap(newSummaryMap);
                            setIsValidCSV(validateCSV(data));
                            setShowErrorOnce(true);
                        },
                    });
                }
            };
            reader.readAsText(file);
        }
    };

    const validateCSV = (data: any[]): boolean => {
        return data.every(row =>
            Object.values(row).every(cell => cell !== null && cell !== undefined && cell !== '')
        );
    };
    return {
        selectedFile, handleFileChange, isValidCSV, fileData, summaryMap, showErrorOnce, handleImportClicked, loading, dataLoading
    }
}
