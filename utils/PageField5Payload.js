import { draftFieldsMap5 } from "@/constants/FieldsPage4";


export function buildPatentSpecificPayloadPage5({ assetId, formData5, activityStatus, draftType }) {
    // Get the relevant fields for this draftType

    if (draftType) {
        const keys = draftFieldsMap5[draftType] || [];
        const data = {};

        keys.forEach(key => {
            data[key] = formData5[key];
        });

        // Compose the payload for Prisma - spread the data fields at top level
        return {
            asset_id: assetId,
            activityStatus: activityStatus ?? '',
            draftType: draftType ?? '',
            rating: formData5.rating || 0,
            patentApplicationNumber: formData5.patentApplicationNumber || '',
            ...data, // Spread the selected fields at top level
        }
    }
    
    // If no draftType, return basic payload
    return {
        asset_id: assetId,
        activityStatus: activityStatus ?? '',
        draftType: draftType ?? '',
        rating: formData5.rating || 0,
        patentApplicationNumber: formData5.patentApplicationNumber || '',
    };
}
