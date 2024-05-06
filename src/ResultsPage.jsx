import React, { useState, useEffect } from 'react';

const ResultsPage = ({ userId }) => {
    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`https://api.example.com/results/${userId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setResult(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
                setError(error.message);
                setIsLoading(false);
            });
    }, [userId]);

    if (isLoading) {
        return <div>Loading results...</div>;
    }

    if (error) {
        return <div>Error fetching results: {error}</div>;
    }

    return (
        <div className="results-page">
            <h1>Health Analysis Results</h1>
            {result ? (
                <div>
                    <h2>Result for User ID: {userId}</h2>
                    <p>Status: {result.hasCancer ? 'Positive for Cancer' : 'Negative for Cancer'}</p>
                    <p>Confidence: {result.confidence ? `${(result.confidence * 100).toFixed(2)}%` : 'N/A'}</p>
                    <p>Comments: {result.comments || 'No additional comments.'}</p>
                </div>
            ) : (
                <p>No results found for this user.</p>
            )}
        </div>
    );
};

export default ResultsPage;