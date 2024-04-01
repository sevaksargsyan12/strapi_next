import {formatDistanceToNow} from 'date-fns';

export function flattenAttributes(data: any): any {
    if (!data) return null;
    
    // Handling array data
    if (Array.isArray(data)) {
        return data.map(flattenAttributes);
    }
    
    let flattened: { [key: string]: any } = {};
    
    // Handling attributes
    if (data.attributes) {
        for (let key in data.attributes) {
            if (typeof data.attributes[key] === "object" && data.attributes[key] !== null && "data" in data.attributes[key]) {
                flattened[key] = flattenAttributes(data.attributes[key].data);
            } else {
                flattened[key] = data.attributes[key];
            }
        }
    }
    
    // Copying non-attributes and non-data properties
    for (let key in data) {
        if (key !== 'attributes' && key !== 'data') {
            flattened[key] = data[key];
        }
    }
    
    // Handling nested data
    if (data.data) {
        flattened = {...flattened, ...flattenAttributes(data.data)};
    }
    
    return flattened;
}

export const formatDateForSave = (dateString: string) => {
    try {
        const dateObj = new Date(dateString);
        return dateObj.toISOString();
    } catch {
        return new Date().toISOString();
    }
}

export const formatDateForShow = (dateString: string) => {
    const date = new Date(dateString);
    const formattedDate = formatDistanceToNow(date, {addSuffix: true});
    return formattedDate;
}
