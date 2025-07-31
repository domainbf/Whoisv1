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
    statusMessage?: string;
}

// Dictionary to map status codes to Chinese names
const statusCodeMap: { [key: string]: string } = {
    'ok': '正常',
    'client delete prohibited': '客户端禁止删除',
    'client hold': '客户端暂停',
    'client renew prohibited': '客户端禁止续订',
    'client transfer prohibited': '客户端禁止转移',
    'client update prohibited': '客户端禁止更新',
    'server delete prohibited': '服务器禁止删除',
    'server hold': '服务器暂停',
    'server renew prohibited': '服务器禁止续订',
    'server transfer prohibited': '服务器禁止转移',
    'server update prohibited': '服务器禁止更新'
};

export function ParseWhois(whoisText: string): WhoisInformation {
    const lines = whoisText.split('\n');
    const info: WhoisInformation = {};

    const notRegisteredPhrases = [
        'No Object Found',
        'The queried object does not exist',
        'No match for domain',
        'Domain not found',
        'Not Registered'
    ];
    const reservedPhrases = [
        'Reserved Name',
        'This domain is reserved'
    ];
    if (notRegisteredPhrases.some(phrase => whoisText.includes(phrase))) {
        info.statusMessage = '未注册';
        return info;
    }
    if (reservedPhrases.some(phrase => whoisText.includes(phrase))) {
        info.statusMessage = '保留域名';
        return info;
    }

    // 检查是否.sn域名（法语字段）
    const isSnFr = /Nom de domaine:/i.test(whoisText);

    if (isSnFr) {
        let billingSection = false;
        let billing: any = {};

        lines.forEach(line => {
            // 域名主信息
            if (/^Nom de domaine:/i.test(line)) {
                info.domainName = line.split(':')[1].trim();
            }
            if (/^Date de création:/i.test(line)) {
                info.creationDate = line.split(':')[1].trim();
            }
            if (/^Dernière modification:/i.test(line)) {
                info.updatedDate = line.split(':')[1].trim();
            }
            if (/^Date d'expiration:/i.test(line)) {
                info.registryExpiryDate = line.split(':')[1].trim();
            }
            if (/^Registrar:/i.test(line)) {
                info.registrar = line.split(':')[1].trim();
            }
            if (/^Statut:/i.test(line)) {
                info.domainStatus = [line.split(':')[1].trim()];
            }

            // 账单联系人块开始
            if (/^\[BILLING_C\]/i.test(line)) billingSection = true;
            // 账单联系人字段提取
            if (billingSection) {
                if (/^ID Contact:/i.test(line)) billing.billingId = line.split(':')[1].trim();
                if (/^Type:/i.test(line)) billing.billingType = line.split(':')[1].trim();
                if (/^Nom:/i.test(line)) billing.billingName = line.split(':')[1].trim();
                if (/^Adresse:/i.test(line)) billing.billingAddress = line.split(':')[1].trim();
                if (/^Code postal:/i.test(line)) billing.billingPostalCode = line.split(':')[1].trim();
                if (/^Ville:/i.test(line)) billing.billingCity = line.split(':')[1].trim();
                if (/^Pays:/i.test(line)) billing.billingCountry = line.split(':')[1].trim();
                if (/^Téléphone:/i.test(line)) billing.billingPhone = line.split(':')[1].trim();
                if (/^Courriel:/i.test(line)) billing.billingEmail = line.split(':')[1].trim();
            }
        });

        // 合并账单字段到 info
        if (billing.billingName) info.billingName = billing.billingName;
        if (billing.billingAddress) info.billingAddress = billing.billingAddress;
        if (billing.billingPostalCode) info.billingPostalCode = billing.billingPostalCode;
        if (billing.billingCity) info.billingCity = billing.billingCity;
        if (billing.billingCountry) info.billingCountry = billing.billingCountry;
        if (billing.billingPhone) info.billingPhone = billing.billingPhone;
        if (billing.billingEmail) info.billingEmail = billing.billingEmail;
    } else {
        // 其他TLD继续走原有逻辑
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
            }
        });
    }

    info.icannWhoisInaccuracyComplaintFormURL = "https://www.icann.org/wicf/";
    if (!info.domainName) {
        info.statusMessage = '可注册';
    }
    return info;
}
