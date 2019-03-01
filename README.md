# SAP Service Cloud Sample Widget for Computer Telephony Integration 

## Description
This is an example of SAP Service Cloud/ Sales Cloud Computer Telephony Integration(CTI) Widget. This project provides a sample implementation for a widget to push information to C4C Application.

This demo simulates incoming calls or outgoing calls to verify the integration on the SAP Service/Sales Cloud via the Live Activity Center module of the product.

> Note: There is no PBX/PSTN setup to make actual phone calls via this widget. It's main aim is to simulate the request on the SAP side in the same way as it should happen in a real call center setup.

## Requirements
This widget runs with SAP Cloud for Customer(C4C) product. SAP Cloud for Customer is a paid offering from SAP Service Cloud. There is no demo available for it.

The logged in user in C4C should have the Live Activity Center workcenter assigned to it.
[The SAP HELP documentation has details on the setup in C4C for widget based integration]( https://help.sap.com/viewer/5f35ee8b31e44f2786d7c2696defa2f6/1811/en-US/b3d0c82ec5de408d9fdb5e894094dc3d.html#loiob3d0c82ec5de408d9fdb5e894094dc3d).

The following software is also required:
- [Git command line tools]( https://git-scm.com/downloads) to cloning this repository. 
- [nodeJS]( https://nodejs.org/en/download/) to running the project<br>


## Download and Installation

- Clone this repository, navigate to the desired folder path in command shell and enter:
    ```
    git clone https://github.com/SAP/cloud-c4s-cti-integration.git
    ```

- In the root folder execute the following commands in the shell:
    ```shell
    npm install
    npm start
    ```

- In the live activity configuration screen select 
    - Provider as "External Provider"
    - Provider url as "http://localhost:3000" ( npm default port is 3000 )

    In a real project, the provider url would be for an actual CTI provider. The url could either be hosted on cloud or be a local server listening to a third party adapter on the client's machine. 

## Known Issues
There are no known issues

## How to obtain support
This project is provided "as-is", with no expected changes or support.  

## License
Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.

This file is licensed under the SAP Sample Code License except as noted otherwise in the [LICENSE](https://github.com/SAP/cloud-c4s-cti-integration/blob/master/License.md) file.


