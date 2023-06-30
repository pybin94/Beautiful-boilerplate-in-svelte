import { got } from "utils/helpers";

export const handleGetSiteProviders = async (): Promise<object> => {
    const response = await got("/provider/site");
    if(response.status == 1) {
        return response.data;
    };
}
