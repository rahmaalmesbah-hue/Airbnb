import { listingsData, type Listing } from "./listingsData";
import { propertiesList, type Property } from "./property";

export type { Listing, Property };
export { listingsData, propertiesList };

export function getPropertyById(id: string): Property | undefined {
  return propertiesList.find((property) => property.id === id);
}

export function getListingById(id: string): Listing | undefined {
  return listingsData.find((listing) => listing.id === id);
}
