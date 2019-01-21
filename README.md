# Mid Ohio Food bank API

## Product Description and requirements
[Requirements](https://github.com/SCODEMeetup/mofb-api/blob/master/product-spec.md)

## Pre-requisites
1. Install Node.js from [installer](https://nodejs.org/en/)
2. Or using [command line](https://nodejs.org/en/download/package-manager/)

## Build / Run
1. Run `npm i` to install all node modules
2. Start server using
```bash
$ npm run start
```
3. Server runs at localhost:3000
```
NOTES:
° All queries default limit to 100. If you want more results returned than that, you must pass in the limit query parameter.
° All queries support grabbing the next page of data. Just pass in the query parameter pageNumber=#
 ```
   1. Bring all pantries - http://localhost:3000/api/v1/pantries
   2. Limit to a zip code - http://localhost:3000/api/v1/pantries/43215

## Docker build
1. Run `npm i` to install all node modules
2. Run `docker-compose build` to build the image
3. Run `docker-compose up` to start image
4. Server runs at localhost:3000, access via http://localhost:3000/api/v1/pantries
5. To access the swagger documentation navigate to http://localhost:3000/api-docs or http://{env}/api-docs/


## Tech Stack
1. Node.js
2. Express

## Tools
1. [VSCode](https://code.visualstudio.com/)

## Adding a new endpoint
1. Create the endpoint in router file
2. If necessary, import the router file in server.js
3. Create the swagger documentation (see swagger.yaml file)

## Environment
GCP (google cloud platform)
1. Pantries - https://mofb-api.appspot.com/pantries
2. Swagger documentation - https://mofb-api.appspot.com/api-docs/

## Data
1. taxonomy.csv: This dataset explains the taxonomy codes applicable to different types of
services
https://ckan.smartcolumbusos.com/dataset/food-pantry-and-user-data/resource/371dd944-411c-4851-a065-9f3f605ddfb9
2. agency.csv: This dataset identifies the locations of agencies across Central Ohio region
https://ckan.smartcolumbusos.com/dataset/food-pantry-and-user-data/resource/570a8e02-fb0e-4cee-895b-3b32bd740650
3. service_taxonomy.csv : This dataset presents the details about the taxonomy codes applicable
to each agency. In other words, services offered at each agency are presented
https://ckan.smartcolumbusos.com/dataset/food-pantry-and-user-data/resource/2a919af7-12d3-47a4-b86a-56692e2e1623
4. service_location.csv : This dataset contains additional information about the service locations,
such as hours of operation:
https://ckan.smartcolumbusos.com/dataset/b0390b58-35c9-45e8-8a2d-d2472b20d65f/resource/ec24773c-7cff-4589-9e2f-bcdeb5cdfd48/download/service_location.csv
5. Images
    1. ![Services aka Taxonomies with subcategories as graph](/extra/services-taxanomy-hierarchy.png)
    2. ![Services aka Taxonomies with subcategories as table](/extra/services-hierarchy-table.png)
    3. ![Agency and Services relation](/extra/agency-services-relation.png)

6. Queries
    1. Generating services hierarchy with its categories
        ```
            SELECT        _TAXON_ID_, _TAXONOMY_CODE_, _DESCRIPTION_, _TAXONOMY_LEVEL_, _TAXON_ID_SUBCAT_OF_
            FROM            dbo.taxonomy
            WHERE        (_ACTIVE_FLAG_ = N'Y') AND (_TAXONOMY_CODE_ = N'B') OR
                                    (_ACTIVE_FLAG_ = N'Y') AND (_TAXONOMY_CODE_ LIKE N'%BD%')
            ORDER BY _TAXONOMY_CODE_
        ```
    2. Getting one service
        ```
            To query each individual point use this and swap out the Description as needed: SELECT  _TAXON_ID_, _TAXONOMY_CODE_, _DESCRIPTION_, _TAXONOMY_LEVEL_, _TAXON_ID_SUBCAT_OF_
            FROM            dbo.taxonomy
            WHERE        (_ACTIVE_FLAG_ = N'Y') AND (_DESCRIPTION_ = N'FOOD')
        ```
