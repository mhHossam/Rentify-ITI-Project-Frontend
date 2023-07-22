export class PropertyAddEditDto {
    propertyName: string = "";
    ImagesURLs: [] = [];  //Images is a List
    MaxNumberOfGuests: number = 0;
    BedroomsCount: number = 0;
    BathroomsCount: number = 0;
    BedCount: number = 0;
    PricePerNight: number = 0;
    CategoryId: number = 0;
    CityId: number = 0;
    Address: string = "";
    Description: string = "";
    AmenitiesId: [] = []; //Amenities is a List
  }  