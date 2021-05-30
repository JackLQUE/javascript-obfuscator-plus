/**
 * @returns {string}
 */
export function DomainLockTemplate (): string {
    return `
        const {domainLockFunctionName} = {callControllerFunctionName}(this, function () {
            
            {globalVariableTemplate}
            
            const regExp = new RegExp("[{domainsStringDiff}]", "g");
            const domains = "{domains}".replace(regExp, "").split(";");
            let document;
            let domain;
            let location;
            let hostname;

            const isName_nlc = function(name, length, cs) {
                if (name.length != length) {
                    return false;
                }

                for (let i = 0; i < length; i++) {
                    for (let j = 0; j < cs.length; j += 2) {
                        if (i == cs[j] && name.charCodeAt(i) != cs[j+1]) {
                            return false;
                        }
                    }
                }

                return true;
            };

            const isName_cnl = function(cs, name, length) {
              return isName_nlc(name, length, cs);
            };

            const isName_ncl = function(name, cs, length) {
              return isName_cnl(cs, name, length);
            };

            const isName_lnc = function(length, name, cs) {
              return isName_nlc(name, length, cs);
            };

            for (let d in that) {
                if (isName_nlc(d, 8, [7, 116, 5, 101, 3, 117, 0, 100])) {
                    document = d;
                
                    break;
                }
            }

            for (let d1 in that[document]) {
                if (isName_lnc(6, d1, [5, 110, 0, 100])) {
                    domain = d1;

                    break;
                }
            }

            for (let d2 in that[document]) {
                if (isName_ncl(d2, [7, 110, 0, 108], 8)) {
                    location = d2;

                    break;
                }
            }

            if (!("~" > domain)) {
                for (let d3 in that[document][location]) {
                    if (isName_cnl([7, 101, 0, 104], d3, 8)) {
                        hostname = d3;
                        
                        break;
                    }
                }
            }
            
            if (!document || !that[document]) {
                return;
            }
            
            const documentDomain = that[document][domain];
            const documentLocationHostName = !!that[document][location] && that[document][location][hostname];
            const currentDomain = documentDomain || documentLocationHostName;
          
            if (!currentDomain) {
                return;
            }
          
            let ok = false;
                        
            for (let i = 0; i < domains.length; i++) {
                const domain = domains[i];
                const domainNormalized = domain[0] === String.fromCharCode(46)
                    ? domain.slice(1)
                    : domain;
                const position = currentDomain.length - domainNormalized.length;
                const lastIndex = currentDomain.indexOf(domainNormalized, position);
                const endsWith = lastIndex !== -1 && lastIndex === position;
                
                if (endsWith) {
                    if (currentDomain.length == domain.length || domain.indexOf(".") === 0) {
                        ok = true;
                    }
                }
            }

            if (!ok) {
                const regExp2 = new RegExp("[{domainDestDiff}]", "g");
                const domainDest = "{domainDest}".replace(regExp2, "");

                that[document][location] = domainDest;
            }
        });

        {domainLockFunctionName}();
    `;
}
