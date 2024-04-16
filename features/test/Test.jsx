import React, { useEffect, useState } from "react";
import { TestAxios } from "../../services/test/axios.service";
import { View, Text } from "react-native";

const Test = () => {
    const [response, setResponse] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseData = await TestAxios();
                setResponse(responseData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    console.log("Response of API is",   response.data.data );

    return (
        <View>
            <Text>a</Text>
        </View>
    );
};

export default Test;
