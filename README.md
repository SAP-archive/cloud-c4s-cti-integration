# Description
This is a SAP Service Cloud/ Sales Cloud CTI Widget Example. This project provides a sample implementation for a widget to push information to C4C Application.
It can be used to simulate incoming calls or outgoing calls to verify the integration on the SAP Service/Sales Cloud via the Live Activity Center module of the product.
It is important to note that there is no PBX/PSTN setup to make actual phone calls via this widget. It's main aim is to simulate the request on the SAP side in the same way as it should happen in a real call center setup.

# Requirements
This widget runs with SAP Cloud for Customer(C4C) product.
The logged in user in C4C should have the Live Activity Center workcenter assigned to it.
More details on the setup in C4C for widget based integration can be found [here]( https://help.sap.com/viewer/5f35ee8b31e44f2786d7c2696defa2f6/1811/en-US/b3d0c82ec5de408d9fdb5e894094dc3d.html#loiob3d0c82ec5de408d9fdb5e894094dc3d).

# Download and Installation
Download Git for cloning this repository. 
<br>Download node for running the project<br>

<br>Clone this git repository and in the root folder execute the following commands in the shell:

```shell
`npm install`
`npm start`
```
In the live activity configuration screen
select 
- Provider as "External Provider"
- Provider url as "http://localhost:3000" ( npm default port is 3000 )

# Known Issues
There are no known issues

# How to obtain support
This project is provided "as-is", with no expected changes or support.  

# License
Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
This file is licensed under the SAP Sample Code License except as noted otherwise in the [LICENSE](https://github.com/SAP/cloud-c4s-cti-integration/blob/master/License.md) file.


