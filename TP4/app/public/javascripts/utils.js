function getStats(emds) {
    var statDict = {
        genero: {},
        modalidade: {},
        clube: {},
        resultado: {},
        federado: {}
    };
    for (let emd of emds) {
        
        statDict.genero[emd.género] = (statDict.genero[emd.género] || 0) + 1;
        
        statDict.modalidade[emd.modalidade] = (statDict.modalidade[emd.modalidade] || 0) + 1;

        statDict.clube[emd.clube] = (statDict.clube[emd.clube] || 0) + 1;

        let resKey = String(emd.resultado);
        statDict.resultado[resKey] = (statDict.resultado[resKey] || 0) + 1;
        
        let fedKey = String(emd.federado);
        statDict.federado[fedKey] = (statDict.federado[fedKey] || 0) + 1;
    }

    return statDict; 
}

exports.getStats = getStats;