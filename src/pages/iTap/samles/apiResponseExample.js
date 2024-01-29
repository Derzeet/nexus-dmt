const response = 
{"nodes": [
        {
            "id": 141592,
            "photoDbf": null,
            "properties": {
                "Status": null,
                "IINBIN": "141592",
                "Buhgalter": null,
                "StatusPFR": null,
                "License": null,
                "BLOCK_ESF": null,
                "RegisterEndDate": null,
                "Source": "MU",
                "Name": "АКИМАТ",
                "Type": "ЮЛ",
                "RegisterStartDate": null,
                "BEZDEYSTVIA_UL": null,
                "PersonID": null,
                "FullNameNatLanguage": "АКИМАТ",
                "Bankrot": null,
                "ERDR": null,
                "DateRegisterAction": "2023-05-26",
                "FPG": null,
                "DeadlinePassed": null,
                "FullNameIP": null
            },
            "relCount": 20,
            "label": "20\t\t\t\t\t\t\t\t\t\n\nАКИМАТ",
            "opened": false,
            "group": "company"
        },
        {
            "id": 653589,
            "photoDbf": null,
            "properties": {
                "Status": null,
                "IINBIN": "653589",
                "Buhgalter": null,
                "StatusPFR": null,
                "License": null,
                "BLOCK_ESF": null,
                "RegisterEndDate": null,
                "Source": "MU",
                "Name": "ЖКХ",
                "Type": "ЮЛ",
                "RegisterStartDate": null,
                "BEZDEYSTVIA_UL": null,
                "PersonID": null,
                "FullNameNatLanguage": "ЖКХ",
                "Bankrot": null,
                "ERDR": null,
                "DateRegisterAction": "2023-05-26",
                "FPG": null,
                "DeadlinePassed": null,
                "FullNameIP": null
            },
            "relCount": 45,
            "label": "45\t\t\t\t\t\t\t\t\t\n\nЖКХ",
            "opened": false,
            "group": "company"
        },
        {
            "id": 462643,
            "photoDbf": null,
            "properties": {
                "Status": null,
                "IINBIN": "462643",
                "Buhgalter": null,
                "StatusPFR": null,
                "License": null,
                "BLOCK_ESF": null,
                "RegisterEndDate": null,
                "Source": "MU",
                "Name": "TOO 1",
                "Type": "ЮЛ",
                "RegisterStartDate": null,
                "BEZDEYSTVIA_UL": null,
                "PersonID": null,
                "FullNameNatLanguage": "TOO 1",
                "Bankrot": null,
                "ERDR": null,
                "DateRegisterAction": "2023-05-26",
                "FPG": null,
                "DeadlinePassed": null,
                "FullNameIP": null
            },
            "relCount": 132,
            "label": "132\t\t\t\t\t\t\t\t\t\n\nTOO 1",
            "opened": false,
            "group": "company"
        },
        {
            "id": 793238,
            "photoDbf": {
                "iin": "793238",
                "document_type_id": "2",
                "photo": avaPhoto,
                "date": "2020-03-02 09:35:16"
            },
            "properties": {
                "Nation": "ҚАЗАҚ",
                "Death_Status": null,
                "Buhgalter": null,
                "StatusPFR": null,
                "Place_of_Birth": "ҚАЗАҚСТАН ТҮРКІСТАН МАҚТААРАЛ АУДАНЫ ЖЕТІСАЙ",
                "Pristavanie": null,
                "Source": "MU",
                "Notarius": null,
                "Name": "ОСМАН",
                "Data_Rozhdenya": "2004-02-05",
                "Propal": null,
                "Autditor": null,
                "PDL": null,
                "SroppedByOrgan": null,
                "id": 793238,
                "Status": null,
                "CHSI": null,
                "StoppedBySud": null,
                "Rozisk": null,
                "Citizenship": "ҚАЗАҚСТАН",
                "Status_Minzdrav": null,
                "FIO": "ОСМАН",
                "IIN": "793238",
                "Doljnik": null,
                "Family": "",
                "Otchestvo": "",
                "DeadlinePassed": null
            },
            "relCount": 6,
            "label": "6\t\t\t\t\t\t\t\t\t\n\nОСМАН",
            "opened": false,
            "group": "person"
        },
    ],
    "edges": [
        {
            "from": 141592,
            "to": 653589,
            "type": "FOUNDER_CUR",
            "properties": {
                "data_konca": "NULL",
                "id": 141592653589,
                "Vid_svyaziey": "Учредитель",
                "data_nachalo": "25.08.2021"
            },
            "label": "Учредитель",
            "color": "black",
            "font": {
                "color": "black"
            },
            "id": 141592653589
        },
        {
            "from": 141592,
            "to": 462643,
            "type": "GOSZAKUP",
            "properties": {
                "data_konca": "NULL",
                "id": 141592462643,
                "Vid_svyaziey": "ГОСЗАКУП 1.6 МЛРД",
                "data_nachalo": "25.08.2021"
            },
            "label": "ГОСЗАКУП 1.6 МЛРД",
            "color": "black",
            "font": {
                "color": "black"
            },
            "id": 141592462643
        },
        {
            "from": 141592,
            "to": 793238,
            "type": "AKIM",
            "properties": {
                "Vid_svyaziey": "АКИМ",
                "data_konca": "12.06.2019",
                "id": 141592793238,
                "data_nachalo": "02.09.2019"
            },
            "label": "АКИМ",
            "color": "black",
            "font": {
                "color": "black"
            },
            "id": 141592793238
        },
    ]
}

export default response