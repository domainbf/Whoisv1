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

// 状态码映射表
const statusCodeMap: { [key: string]: string } = {
    'ok': '正常',
    'clientdeleteprohibited': '客户端禁止删除',
    'clienthold': '客户端暂停',
    'clientrenewprohibited': '客户端禁止续订',
    'clienttransferprohibited': '客户端禁止转移',
    'clientupdateprohibited': '客户端禁止更新',
    'serverdeleteprohibited': '服务器禁止删除',
    'serverhold': '服务器暂停',
    'serverrenewprohibited': '服务器禁止续订',
    'servertransferprohibited': '服务器禁止转移',
    'serverupdateprohibited': '服务器禁止更新'
};

// 状态字符串解析（兼容带URL及多行）
function parseStatusLine(line: string): string[] {
    return (
        line
            .split(/[\n,]+/)
            .map(item => {
                // 提取状态码部分
                const match = item.match(/([a-zA-Z]+(?:DeleteProhibited|Hold|RenewProhibited|TransferProhibited|UpdateProhibited|OK|ok))/);
                let code = match ? match[1].toLowerCase().replace(/\s+/g, '') : '';
                // 若找不到状态码，尝试整行
                if (!code && item.trim()) code = item.trim().toLowerCase().replace(/\s+/g, '');
                return statusCodeMap[code] || item.trim();
            })
            // 去除URL和空内容
            .filter(s => !!s && !s.startsWith('http'))
    );
}

// 日期安全转换，若非法则返回原字符串（避免页面Invalid time value）
function safeDate(s: string | undefined): string | undefined {
    if (!s) return undefined;
    if (/T\d{2}:\d{2}:\d{2}/.test(s)) return s;
    const d = new Date(s);
    if (isNaN(d.getTime())) return s;
    return d.toISOString();
}

// 未注册和保留域名的增强判断
function checkUnregisteredReserved(whoisText: string): {unregistered: boolean, reserved: boolean, message: string} {
    const notRegisteredPhrases = [
        'No Object Found',
        'The queried object does not exist',
        'No match for domain',
        'No entries found',
        'Domain not found',
        'Not Registered',
        'is free',
        'Status: free',
        'Status: Available',
        'no data found',
        'not been registered',
        'The domain has not been registered',
        'not registered',
        'Object_Not_Found'
    ];
    const reservedPhrases = [
        'Reserved Name',
        'This domain is reserved',
        'is reserved',
        'Status: Reserved',
        'reserved by registry',
        'reserved domain'
    ];

    for (const phrase of notRegisteredPhrases) {
        if (whoisText.toLowerCase().includes(phrase.toLowerCase())) {
            return {unregistered: true, reserved: false, message: '未注册（可注册）'};
        }
    }
    for (const phrase of reservedPhrases) {
        if (whoisText.toLowerCase().includes(phrase.toLowerCase())) {
            return {unregistered: false, reserved: true, message: '保留域名'};
        }
    }
    // 额外：部分whois会有Available、未分配、free等短语
    if (/status:\s*available/i.test(whoisText) || /\bavailable\b/i.test(whoisText)) {
        return {unregistered: true, reserved: false, message: '未注册（可注册）'};
    }
    if (/status:\s*reserved/i.test(whoisText) || /\breserved\b/i.test(whoisText)) {
        return {unregistered: false, reserved: true, message: '保留域名'};
    }
    return {unregistered: false, reserved: false, message: ''};
}

export function ParseWhois(whoisText: string): WhoisInformation {
    const lines = whoisText.split('\n');
    const info: WhoisInformation = {};

    // 增强未注册/保留域名判断
    const statusCheck = checkUnregisteredReserved(whoisText);
    if (statusCheck.unregistered) {
        info.statusMessage = statusCheck.message;
        info.domainStatus = [statusCheck.message];
        return info;
    }
    if (statusCheck.reserved) {
        info.statusMessage = statusCheck.message;
        info.domainStatus = [statusCheck.message];
        return info;
    }

    // 法语账单块
    let billingSection = false;
    let billing: any = {};

    lines.forEach(line => {
        // 法语主字段
        if (/^Nom de domaine\s*:/i.test(line)) info.domainName = line.split(':').slice(1).join(':').trim();
        if (/^Date de création\s*:/i.test(line)) info.creationDate = safeDate(line.split(':').slice(1).join(':').trim());
        if (/^Dernière modification\s*:/i.test(line)) info.updatedDate = safeDate(line.split(':').slice(1).join(':').trim());
        if (/^Date d'expiration\s*:/i.test(line)) info.registryExpiryDate = safeDate(line.split(':').slice(1).join(':').trim());
        if (/^Registrar\s*:/i.test(line)) info.registrar = line.split(':').slice(1).join(':').trim();
        if (/^Statut\s*:/i.test(line)) info.domainStatus = parseStatusLine(line.split(':').slice(1).join(':').trim());

        // 账单块开始
        if (/^\[BILLING_C\]/i.test(line)) billingSection = true;
        if (billingSection) {
            if (/^ID Contact\s*:/i.test(line)) billing.billingId = line.split(':').slice(1).join(':').trim();
            if (/^Type\s*:/i.test(line)) billing.billingType = line.split(':').slice(1).join(':').trim();
            if (/^Nom\s*:/i.test(line)) billing.billingName = line.split(':').slice(1).join(':').trim();
            if (/^Adresse\s*:/i.test(line)) billing.billingAddress = line.split(':').slice(1).join(':').trim();
            if (/^Code postal\s*:/i.test(line)) billing.billingPostalCode = line.split(':').slice(1).join(':').trim();
            if (/^Ville\s*:/i.test(line)) billing.billingCity = line.split(':').slice(1).join(':').trim();
            if (/^Pays\s*:/i.test(line)) billing.billingCountry = line.split(':').slice(1).join(':').trim();
            if (/^Téléphone\s*:/i.test(line)) billing.billingPhone = line.split(':').slice(1).join(':').trim();
            if (/^Courriel\s*:/i.test(line)) billing.billingEmail = line.split(':').slice(1).join(':').trim();
        }

        // 英文字段解析
        const [key, value] = line.split(/:\s+/).map(part => part?.trim());
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
                info.updatedDate = safeDate(value);
                break;
            case 'creation date':
            case 'created date':
            case 'created':
            case 'registration date':
                info.creationDate = safeDate(value);
                break;
            case 'registry expiry date':
            case 'expiry date':
            case 'expires on':
            case 'expiration date':
                info.registryExpiryDate = safeDate(value);
                break;
            case 'registrar':
                info.registrar = value;
                break;
            case 'registrar iana id':
                info.registrarIANAID = value;
                break;
            case 'domain status':
            case 'status':
                if (!info.domainStatus) info.domainStatus = [];
                info.domainStatus.push(...parseStatusLine(value));
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

    // 合并法语账单联系人
    if (billing.billingName) info.billingName = billing.billingName;
    if (billing.billingAddress) info.billingAddress = billing.billingAddress;
    if (billing.billingPostalCode) info.billingPostalCode = billing.billingPostalCode;
    if (billing.billingCity) info.billingCity = billing.billingCity;
    if (billing.billingCountry) info.billingCountry = billing.billingCountry;
    if (billing.billingPhone) info.billingPhone = billing.billingPhone;
    if (billing.billingEmail) info.billingEmail = billing.billingEmail;

    info.icannWhoisInaccuracyComplaintFormURL = "https://www.icann.org/wicf/";
    if (!info.domainName && !info.statusMessage) {
        info.statusMessage = '无法识别域名状态';
        info.domainStatus = ['无法识别域名状态'];
    }
    return info;
}
