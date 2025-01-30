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
    registrantAddress?: string;
    registrantCity?: string;
    registrantState?: string;
    registrantPostalCode?: string;
    registrantCountry?: string;
    registrantEmail?: string;
    registrantPhone?: string;
    adminName?: string;
    adminOrganization?: string;
    adminAddress?: string;
    adminCity?: string;
    adminState?: string;
    adminPostalCode?: string;
    adminCountry?: string;
    adminEmail?: string;
    adminPhone?: string;
    techName?: string;
    techOrganization?: string;
    techAddress?: string;
    techCity?: string;
    techState?: string;
    techPostalCode?: string;
    techCountry?: string;
    techEmail?: string;
    techPhone?: string;
    billingName?: string;
    billingOrganization?: string;
    billingAddress?: string;
    billingCity?: string;
    billingState?: string;
    billingPostalCode?: string;
    billingCountry?: string;
    billingEmail?: string;
    billingPhone?: string;
}

export function ParseWhois(whoisText: string): WhoisInformation {
    const lines = whoisText.split('\n'); // 将文本分割成行
    const info: WhoisInformation = {}; // 创建一个空对象来存储提取的信息

    lines.forEach(line => {
        const [key, value] = line.split(/:\s+/).map(part => part.trim()); // 使用正则表达式以处理更多的分隔符变体
        if (!key || !value) return; // 跳过空行或无效行

        switch (key.toLowerCase()) { // 使用小写进行匹配
            case 'domain name':
            case 'domain':
            case 'domainname':
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
                info.creationDate = value;
                break;
            case 'registry expiry date':
            case 'expiry date':
            case 'expires on':
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
                info.dnssec = value;
                break;
        }
    });

    info.icannWhoisInaccuracyComplaintFormURL = "https://www.icann.org/wicf/";

    return info;
}
