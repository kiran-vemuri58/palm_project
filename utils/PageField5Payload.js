import { draftFieldsMap5 } from "@/constants/FieldsPage4";


export function buildPatentSpecificPayloadPage5({ assetId, formData5, activityStatus, draftType }) {
    // Get the relevant fields for this draftType

    if (draftType) {
        const keys = draftFieldsMap5[draftType] || [];
        const data = {};

        keys.forEach(key => {
            data[key] = formData5[key];
        });

        // Compose the payload for Prisma
        return {
            asset_id: assetId,
            activityStatus: activityStatus ?? null, // Or however you want to set these top-level fields
            draftType: draftType ?? draftType,
            data, // Only the picked fields are present here!
        }

    }
}
