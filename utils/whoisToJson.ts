interface WhoisInformation {
    domainName?: string;
    registryDomainID?: string;
    registrarWHOISServer?: string;
    registrarURL?: string;
    updatedDate?: string;
    creationDate?: string;
    registryExpiryDate?: string;
    registrar?: string;
    registrarIANAID?: string;
    domainStatus?: string;
    nameServers?: string;
    dnssec?: string;
    icannWhoisInaccuracyComplaintFormURL?: string;

    // 新增字段
    registrantName?: string; // 注册人姓名
    registrantOrganization?: string; // 注册人组织
    registrantStreet?: string; // 注册人街道地址
    registrantCity?: string; // 注册人城市
    registrantState?: string; // 注册人州/省份
    registrantPostalCode?: string; // 注册人邮政编码
    registrantCountry?: string; // 注册人国家
    registrantEmail?: string; // 注册人邮箱
    registrantPhone?: string; // 注册人电话
    adminName?: string; // 管理员姓名
    adminOrganization?: string; // 管理员组织
    adminStreet?: string; // 管理员街道地址
    adminCity?: string; // 管理员城市
    adminState?: string; // 管理员州/省份
    adminPostalCode?: string; // 管理员邮政编码
    adminCountry?: string; // 管理员国家
    adminEmail?: string; // 管理员邮箱
    adminPhone?: string; // 管理员电话
    techName?: string; // 技术联系人姓名
    techOrganization?: string; // 技术联系人组织
    techStreet?: string; // 技术联系人街道地址
    techCity?: string; // 技术联系人城市
    techState?: string; // 技术联系人州/省份
    techPostalCode?: string; // 技术联系人邮政编码
    techCountry?: string; // 技术联系人国家
    techEmail?: string; // 技术联系人邮箱
    techPhone?: string; // 技术联系人电话
    billingName?: string; // 付款联系人姓名
    billingOrganization?: string; // 付款联系人组织
    billingStreet?: string; // 付款联系人街道地址
    billingCity?: string; // 付款联系人城市
    billingState?: string; // 付款联系人州/省份
    billingPostalCode?: string; // 付款联系人邮政编码
    billingCountry?: string; // 付款联系人国家
    billingEmail?: string; // 付款联系人邮箱
    billingPhone?: string; // 付款联系人电话
}

export function ParseWhois(whoisText: string): WhoisInformation {
    //... (之前的代码)

    lines.forEach(line => {
        //... (之前的代码)

        switch (key.toLowerCase()) {
            //... (之前的代码)

            // 新增 case
            case 'registrant name':
            case 'registrant contact':
                info.registrantName = value;
                break;
            case 'registrant organization':
                info.registrantOrganization = value;
                break;
            case 'registrant street':
            case 'registrant address':
                info.registrantStreet = value;
                break;
            case 'registrant city':
                info.registrantCity = value;
                break;
            case 'registrant state':
                info.registrantState = value;
                break;
            case 'registrant postal code':
                info.registrantPostalCode = value;
                break;
            case 'registrant country':
                info.registrantCountry = value;
                break;
            case 'registrant email':
                info.registrantEmail = value;
                break;
            case 'registrant phone':
                info.registrantPhone = value;
                break;

            // 管理员信息
            case 'admin name':
            case 'admin contact':
                info.adminName = value;
                break;
            case 'admin organization':
                info.adminOrganization = value;
                break;
            case 'admin street':
            case 'admin address':
                info.adminStreet = value;
                break;
            case 'admin city':
                info.adminCity = value;
                break;
            case 'admin state':
                info.adminState = value;
                break;
            case 'admin postal code':
                info.adminPostalCode = value;
                break;
            case 'admin country':
                info.adminCountry = value;
                break;
            case 'admin email':
                info.adminEmail = value;
                break;
            case 'admin phone':
                info.adminPhone = value;
                break;

            // 技术联系人信息
            case 'tech name':
            case 'tech contact':
                info.techName = value;
                break;
            case 'tech organization':
                info.techOrganization = value;
                break;
            case 'tech street':
            case 'tech address':
                info.techStreet = value;
                break;
            case 'tech city':
                info.techCity = value;
                break;
            case 'tech state':
                info.techState = value;
                break;
            case 'tech postal code':
                info.techPostalCode = value;
                break;
            case 'tech country':
                info.techCountry = value;
                break;
            case 'tech email':
                info.techEmail = value;
                break;
            case 'tech phone':
                info.techPhone = value;
                break;

            // 付款联系人信息
            case 'billing name':
            case 'billing contact':
                info.billingName = value;
                break;
            case 'billing organization':
                info.billingOrganization = value;
                break;
            case 'billing street':
            case 'billing address':
                info.billingStreet = value;
                break;
            case 'billing city':
                info.billingCity = value;
                break;
            case 'billing state':
                info.billingState = value;
                break;
            case 'billing postal code':
                info.billingPostalCode = value;
                break;
            case 'billing country':
                info.billingCountry = value;
                break;
            case 'billing email':
                info.billingEmail = value;
                break;
            case 'billing phone':
                info.billingPhone = value;
                break;

            //... (之前的 case)
        }
    });

    //... (之前的代码)
}
