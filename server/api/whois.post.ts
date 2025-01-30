import { whois } from "~/server/whois/whois";
import axios from "axios";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    if (!body || !body.domain) {
        return {
            error: "Invalid request: Missing domain parameter."
        };
    }

    try {
        const res = await whois(body.domain);
        let domainInfo = {};
        if (res._raw.trim() === "") {
            domainInfo = {
                message: `No match for "${body.domain}".`,
                lastUpdate: `>>> Last update of whois database: ${new Date()} <<<`,
                notice: 'NOTICE: The expiration date displayed in this record is the date the\n' +
                        'registrar\'s sponsorship of the domain name registration in the registry is\n' +
                        'currently set to expire. This date does not necessarily reflect the expiration\n' +
                        'date of the domain name registrant\'s agreement with the sponsoring\n' +
                        'registrar. Users may consult the sponsoring registrar\'s Whois database to\n' +
                        'view the registrar\'s reported date of expiration for this registration.\n' +
                        'TERMS OF USE: You are not authorized to access or query our Whois\n' +
                        'database through the use of electronic processes that are high-volume and\n' +
                        'automated except as reasonably necessary to register domain names or\n' +
                        'modify existing registrations; the Data in VeriSign Global Registry\n' +
                        'Services\' ("VeriSign") Whois database is provided by VeriSign for\n' +
                        'information purposes only, and to assist persons in obtaining information\n' +
                        'about or related to a domain name registration record. VeriSign does not\n' +
                        'guarantee its accuracy. By submitting a Whois query, you agree to abide\n' +
                        'by the following terms of use: You agree that you may use this Data only\n' +
                        'for lawful purposes and that under no circumstances will you use this Data\n' +
                        'to: (1) allow, enable, or otherwise support the transmission of mass\n' +
                        'unsolicited, commercial advertising or solicitations via e-mail, telephone,\n' +
                        'or facsimile; or (2) enable high volume, automated, electronic processes\n' +
                        'that apply to VeriSign (or its computer systems). The compilation,\n' +
                        'repackaging, dissemination or other use of this Data is expressly\n' +
                        'prohibited without the prior written consent of VeriSign. You agree not to\n' +
                        'use electronic processes that are automated and high-volume to access or\n' +
                        'query the Whois database except as reasonably necessary to register\n' +
                        'domain names or modify existing registrations. VeriSign reserves the right\n' +
                        'to restrict your access to the Whois database in its sole discretion to ensure\n' +
                        'operational stability. VeriSign may restrict or terminate your access to the\n' +
                        'Whois database for failure to abide by these terms of use. VeriSign\n' +
                        'reserves the right to modify these terms at any time.\n' +
                        'The Registry database contains ONLY .COM, .NET, .EDU domains and\n' +
                        'Registrars.'
            };
        } else {
            domainInfo = {
                raw: res._raw
            };
        }

        // Fetch domain prices from the new API
        const pricesRes = await axios.get(`https://www.nazhumi.com/api/v1/domain-prices`, {
            params: {
                domain: body.domain
            }
        });

        if (!pricesRes.data) {
            throw new Error("Failed to fetch domain prices");
        }

        // Add the prices to the response
        domainInfo.prices = pricesRes.data;

        return domainInfo;
    } catch (e) {
        console.error("Error fetching WHOIS information or domain prices:", e);
        return {
            error: e.message,
            lastUpdate: `>>> Last update of whois database: ${new Date()} <<<`,
            notice: 'NOTICE: The expiration date displayed in this record is the date the\n' +
                    'registrar\'s sponsorship of the domain name registration in the registry is\n' +
                    'currently set to expire. This date does not necessarily reflect the expiration\n' +
                    'date of the domain name registrant\'s agreement with the sponsoring\n' +
                    'registrar. Users may consult the sponsoring registrar\'s Whois database to\n' +
                    'view the registrar\'s reported date of expiration for this registration.\n' +
                    'TERMS OF USE: You are not authorized to access or query our Whois\n' +
                    'database through the use of electronic processes that are high-volume and\n' +
                    'automated except as reasonably necessary to register domain names or\n' +
                    'modify existing registrations; the Data in VeriSign Global Registry\n' +
                    'Services\' ("VeriSign") Whois database is provided by VeriSign for\n' +
                    'information purposes only, and to assist persons in obtaining information\n' +
                    'about or related to a domain name registration record. VeriSign does not\n' +
                    'guarantee its accuracy. By submitting a Whois query, you agree to abide\n' +
                    'by the following terms of use: You agree that you may use this Data only\n' +
                    'for lawful purposes and that under no circumstances will you use this Data\n' +
                    'to: (1) allow, enable, or otherwise support the transmission of mass\n' +
                    'unsolicited, commercial advertising or solicitations via e-mail, telephone,\n' +
                    'or facsimile; or (2) enable high volume, automated, electronic processes\n' +
                    'that apply to VeriSign (or its computer systems). The compilation,\n' +
                    'repackaging, dissemination or other use of this Data is expressly\n' +
                    'prohibited without the prior written consent of VeriSign. You agree not to\n' +
                    'use electronic processes that are automated and high-volume to access or\n' +
                    'query the Whois database except as reasonably necessary to register\n' +
                    'domain names or modify existing registrations. VeriSign reserves the right\n' +
                    'to restrict your access to the Whois database in its sole discretion to ensure\n' +
                    'operational stability. VeriSign may restrict or terminate your access to the\n' +
                    'Whois database for failure to abide by these terms of use. VeriSign\n' +
                    'reserves the right to modify these terms at any time.\n' +
                    'The Registry database contains ONLY .COM, .NET, .EDU domains and\n' +
                    'Registrars.'
        };
    }
});
