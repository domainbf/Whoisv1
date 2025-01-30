interface WhoisInformation {
    domainName?: string;
    registrar?: string;
    creationDate?: string;
    updatedDate?: string;
    registryExpiryDate?: string;
    domainStatus?: string[];
    nameServers?: string[];
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
    icannWhoisInaccuracyComplaintFormURL?: string;
}

export function ParseWhois(whoisText: string): WhoisInformation {
    const info: WhoisInformation = {};

    // 1. 域名信息
    const domainMatch = whoisText.match(/Domain Name:\s*(.*)/i); // i flag for case-insensitive matching
    if (domainMatch) info.domainName = domainMatch[1].trim();

    const registrarMatch = whoisText.match(/Registrar:\s*(.*)/i);
    if (registrarMatch) info.registrar = registrarMatch[1].trim();

    const creationDateMatch = whoisText.match(/Creation Date:\s*(.*)/i);
    if (creationDateMatch) info.creationDate = creationDateMatch[1].trim();

    const modifiedDateMatch = whoisText.match(/Modified Date:\s*(.*)/i);
    if (modifiedDateMatch) info.updatedDate = modifiedDateMatch[1].trim();

    const expiryDateMatch = whoisText.match(/Expiration Date:\s*(.*)/i);
    if (expiryDateMatch) info.registryExpiryDate = expiryDateMatch[1].trim();

    const domainStatusMatch = whoisText.match(/Domain Status:\s*(.*)/i);
    if (domainStatusMatch) info.domainStatus = domainStatusMatch[1].trim().split(',').map(status => status.trim());

    const nameServersMatch = whoisText.match(/Name Servers?:\s*([\s\S]*)/i);
    if (nameServersMatch) {
        info.nameServers = nameServersMatch[1].trim().split(/\s+/); // Split by whitespace
    }

    // 2. 联系人信息（注册人、管理联系人、技术联系人）- 使用更灵活的正则
    const contactRegex = /(Registrant|Administrative Contact|Technical Contact|Billing Contact):\s*([\s\S]*?)\n\n/gi; // g and i flags
    let contactMatch;

    while ((contactMatch = contactRegex.exec(whoisText)) !== null) {
        const contactType = contactMatch[1].trim();
        const contactInfo = contactMatch[2].trim();

        const nameMatch = contactInfo.match(/Name:\s*(.*)/i);
        const organizationMatch = contactInfo.match(/Organization:\s*(.*)/i);
        const emailMatch = contactInfo.match(/Email:\s*(.*)/i);
        const phoneMatch = contactInfo.match(/Phone:\s*(.*)/i);
        const addressMatch = contactInfo.match(/Address:\s*(.*)/i);
        const cityMatch = contactInfo.match(/City:\s*(.*)/i);
        const stateMatch = contactInfo.match(/State:\s*(.*)/i);
        const postalCodeMatch = contactInfo.match(/Postal Code:\s*(.*)/i);
        const countryMatch = contactInfo.match(/Country:\s*(.*)/i);

        switch (contactType.toLowerCase()) {
            case 'registrant':
                info.registrantName = nameMatch ? nameMatch[1].trim() : null;
                info.registrantOrganization = organizationMatch ? organizationMatch[1].trim() : null;
                info.registrantEmail = emailMatch ? emailMatch[1].trim() : null;
                info.registrantPhone = phoneMatch ? phoneMatch[1].trim() : null;
                info.registrantAddress = addressMatch ? addressMatch[1].trim() : null;
                info.registrantCity = cityMatch ? cityMatch[1].trim() : null;
                info.registrantState = stateMatch ? stateMatch[1].trim() : null;
                info.registrantPostalCode = postalCodeMatch ? postalCodeMatch[1].trim() : null;
                info.registrantCountry = countryMatch ? countryMatch[1].trim() : null;
                break;
            case 'administrative contact':
                info.adminName = nameMatch ? nameMatch[1].trim() : null;
                info.adminOrganization = organizationMatch ? organizationMatch[1].trim() : null;
                info.adminEmail = emailMatch ? emailMatch[1].trim() : null;
                info.adminPhone = phoneMatch ? phoneMatch[1].trim() : null;
                info.adminAddress = addressMatch ? addressMatch[1].trim() : null;
                info.adminCity = cityMatch ? cityMatch[1].trim() : null;
                info.adminState = stateMatch ? stateMatch[1].trim() : null;
                info.adminPostalCode = postalCodeMatch ? postalCodeMatch[1].trim() : null;
                info.adminCountry = countryMatch ? countryMatch[1].trim() : null;
                break;
            case 'technical contact':
                info.techName = nameMatch ? nameMatch[1].trim() : null;
                info.techOrganization = organizationMatch ? organizationMatch[1].trim() : null;
                info.techEmail = emailMatch ? emailMatch[1].trim() : null;
                info.techPhone = phoneMatch ? phoneMatch[1].trim() : null;
                info.techAddress = addressMatch ? addressMatch[1].trim() : null;
                info.techCity = cityMatch ? cityMatch[1].trim() : null;
                info.techState = stateMatch ? stateMatch[1].trim() : null;
                info.techPostalCode = postalCodeMatch ? postalCodeMatch[1].trim() : null;
                info.techCountry = countryMatch ? countryMatch[1].trim() : null;
                break;
            case 'billing contact':
                info.billingName = nameMatch ? nameMatch[1].trim() : null;
                info.billingOrganization = organizationMatch ? organizationMatch[1].trim() : null;
                info.billingEmail = emailMatch ? emailMatch[1].trim() : null;
                info.billingPhone = phoneMatch ? phoneMatch[1].trim() : null;
                info.billingAddress = addressMatch ? addressMatch[1].trim() : null;
                info.billingCity = cityMatch ? cityMatch[1].trim() : null;
                info.billingState = stateMatch ? stateMatch[1].trim() : null;
                info.billingPostalCode = postalCodeMatch ? postalCodeMatch[1].trim() : null;
                info.billingCountry = countryMatch ? countryMatch[1].trim() : null;
                break;
        }
    }

    info.icannWhoisInaccuracyComplaintFormURL = "https://www.icann.org/wicf/";
    return info;
}
