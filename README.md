# RestaurantOwnerWebApp

App is Restaurant owner facing. Restaurant Owner or Manager can do crud operations for menu such as adding menu items, removing and etc. The data is then used to create a shopify like consumer site showcasing the restaurants menu items and able to create orders send to restaurant via email. (might use this for consumer facing app https://amp.dev/documentation/templates/preview/websites/e-commerce/templates/landing.amp.html?format=websites)

## Setup for local development

- Run `amplify pull --appId {appId} --envName {env name}` to connect to a backend env, when asked if you will edit backend code select No
- Run `aws appsync get-introspection-schema --api-id={graphql id} --format=JSON schema.json --profile={aws profile id}` to get latest schema
- Run `amplify codegen` to generage queries, mutations and subscriptions in src folder
