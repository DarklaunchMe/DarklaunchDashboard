interface PayloadType {
    body: any;
    type: string;
}

export const PayloadType = {
    JSON: 'JSON',
    ARRAY_BUFFER: 'ARRAY_BUFFER',
    ARRAY_BUFFER_VIEW: 'ARRAY_BUFFER_VIEW',
    BLOB: 'BLOB',
    STRING: 'STRING',
    URL_SEARCH_PARAMS: 'URL_SEARCH_PARAMS',
    FORM_DATA: 'FORM_DATA'
};

export function formatBody(payload: PayloadType) {
    if (payload.type === PayloadType.JSON) {
        return JSON.stringify(payload);
    }
    return payload.body;
}