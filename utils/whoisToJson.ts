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
    domainStatus?: string[];
    nameServers?: string[];
    dnssec?: string;
    icannWhoisInaccuracyComplaintFormURL?: string;
    registrantName?: string;
    registrantOrganization?: string;
    registrantEmail?: string;
    registrantPhone?: string;
    registrantAddress?: string;
    registrantCity?: string;
    registrantState?: string;
    registrantPostalCode?: string;
    registrantCountry?: string;
    adminName?: string;
    adminOrganization?: string;
    adminEmail?: string;
    adminPhone?: string;
    adminAddress?: string;
    adminCity?: string;
    adminState?: string;
    adminPostalCode?: string;
    adminCountry?: string;
    techName?: string;
    techOrganization?: string;
    techEmail?: string;
    techPhone?: string;
    techAddress?: string;
    techCity?: string;
    techState?: string;
    techPostalCode?: string;
    techCountry?: string;
    billingName?: string;
    billingOrganization?: string;
    billingEmail?: string;
    billingPhone?: string;
    billingAddress?: string;
    billingCity?: string;
    billingState?: string;
    billingPostalCode?: string;
    billingCountry?: string;
}

export function ParseWhois(whoisText: string): WhoisInformation {
    const lines = whoisText.split('\n');
    const info: WhoisInformation = {};

    lines.forEach(line => {
        const [key, value] = line.split(/:\s+/).map(part => part.trim());
        if (!key || !value) return;

        switch (key.toLowerCase()) {
            case 'domain name':
            case 'domain':
            case 'domainname':
            case 'omain':
                info.domainName = value;
                break;
            case 'registry domain id':
            case 'domain id':
                info.registryDomainID = value;
                break;
            case 'registrar whois server':
            case 'whois server':
                info.registrarWHOISServer = value;
                break;
            case 'registrar url':
            case 'url':
                info.registrarURL = value;
                break;
            case 'updated date':
            case 'last updated':
            case 'last modified':
                info.updatedDate = value;
                break;
            case 'creation date':
            case 'created date':
            case 'created':
            case 'registration date':
                info.creationDate = value;
                break;
            case 'registry expiry date':
            case 'expiry date':
            case 'expires on':
            case 'expiration date':
                info.registryExpiryDate = value;
                break;
            case 'registrar':
                info.registrar = value;
                break;
            case 'registrar iana id':
                info.registrarIANAID = value;
                break;
            case 'domain status':
            case 'status':
                info.domainStatus = info.domainStatus ? [...info.domainStatus, value] : [value];
                break;
            case 'name server':
            case 'nameserver':
            case 'nserver':
                info.nameServers = info.nameServers ? [...info.nameServers, value] : [value];
                break;
            case 'dnssec':
            case 'dnssec status':
                info.dnssec = value;
                break;
            case 'registrant name':
                info.registrantName = value;
                break;
            case 'registrant organization':
                info.registrantOrganization = value;
                break;
            case 'registrant email':
                info.registrantEmail = value;
                break;
            case 'registrant phone':
                info.registrantPhone = value;
                break;
            case 'registrant address':
                info.registrantAddress = value;
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
            case 'admin name':
                info.adminName = value;
                break;
            case 'admin organization':
                info.adminOrganization = value;
                break;
            case 'admin email':
                info.adminEmail = value;
                break;
            case 'admin phone':
                info.adminPhone = value;
                break;
            case 'admin address':
                info.adminAddress = value;
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
            case 'tech name':
                info.techName = value;
                break;
            case 'tech organization':
                info.techOrganization = value;
                break;
            case 'tech email':
                info.techEmail = value;
                break;
            case 'tech phone':
                info.techPhone = value;
                break;
            case 'tech address':
                info.techAddress = value;
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
            case 'billing name':
                info.billingName = value;
                break;
            case 'billing organization':
                info.billingOrganization = value;
                break;
            case 'billing email':
                info.billingEmail = value;
                break;
            case 'billing phone':
                info.billingPhone = value;
                break;
            case 'billing address':
                info.billingAddress = value;
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
            // Adding support for more irregular characters
            case 'registration date':
                info.creationDate = value;
                break;
            case 'expiration date':
                info.registryExpiryDate = value;
                break;
            case 'dnssec status':
                info.dnssec = value;
                break;
            case 'whois server':
                info.registrarWHOISServer = value;
                break;
            case 'registrar address':
                info.registrar = value;
                break;
            case 'registrar contact email':
                info.registrantEmail = value;
                break;
        }
    });

    info.icannWhoisInaccuracyComplaintFormURL = "https://www.icann.org/wicf/";

    return info;
}
