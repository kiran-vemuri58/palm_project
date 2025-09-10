import { draftFieldsMap } from '@/constants/FieldsPage4';

export function buildPatentSpecificPayload({ assetId, formData4, activityStatus, draftType }) {
    // Get the relevant fields for this draftType
    if (draftType) {
        const keys = draftFieldsMap[draftType] || [];
        const data = {};

        keys.forEach(key => {
            data[key] = formData4[key];
        });

        // Compose the payload for Prisma - spread the data fields at top level
        return {
            asset_id: assetId,
            activityStatus: activityStatus ?? '',
            draftType: draftType ?? '',
            rating: formData4.rating || 0,
            ...data, // Spread the selected fields at top level
        }
    }
    
    // If no draftType, return basic payload
    return {
        asset_id: assetId,
        activityStatus: activityStatus ?? '',
        draftType: draftType ?? '',
        rating: formData4.rating || 0,
    };
}
