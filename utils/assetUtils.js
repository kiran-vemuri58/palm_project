export async function fetchAssetIdFromDB() {
  try {
    const res = await fetch('/api/lastAssetId');
    const data = await res.json();

    if (!res.ok || !data.assetId) {
      console.error('Failed to fetch asset ID:', data.error || 'Unknown error');
      return null;
    }

    // Generate the next asset ID
    const currentAssetId = data.assetId;
    const lastNumber = parseInt(currentAssetId.slice(1)) || 0;
    const nextNumber = (lastNumber + 1).toString().padStart(4, '0');
    const nextAssetId = `A${nextNumber}`;
    
    return nextAssetId;
  } catch (error) {
    console.error('Error fetching asset ID:', error);
    return null;
  }
}
