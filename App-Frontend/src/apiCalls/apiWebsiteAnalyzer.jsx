import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useAnalyzeWebsite = () => {
    return useMutation({
        mutationFn: async ({ url }) => {
            await new Promise((resolve) => setTimeout(resolve, 2000));

            const { data } = await axios.post(
                "https://parsingsiteproject.onrender.com/api/v1/analyzewebsite",
                { url }
            );

            return data;
        },
    });
};