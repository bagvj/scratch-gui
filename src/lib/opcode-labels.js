const opcodeMap = {
    // Motion
    motion_direction: {
        category: 'motion',
        label: '方向'
    },
    motion_xposition: {
        category: 'motion',
        label: 'x位置'
    },
    motion_yposition: {
        category: 'motion',
        label: 'y位置'
    },

    // Ai
    ai_speechResult: {
        category: 'ai',
        label: '语音识别结果'
    },
    ai_picResult: {
        category: 'ai',
        label: '图像识别结果'
    },

    // Looks
    looks_size: {
        category: 'looks',
        label: '尺寸'
    },
    looks_costumenumbername: {
        category: 'looks',
        labelFn: params => `造型 ${params.NUMBER_NAME}`
    },
    looks_backdropnumbername: {
        category: 'looks',
        labelFn: params => `背景 ${params.NUMBER_NAME}`
    },
    looks_backdropname: {
        category: 'looks',
        label: '背景名字'
    },

    // Data
    data_variable: {
        category: 'data',
        labelFn: params => params.VARIABLE
    },
    data_listcontents: {
        category: 'list',
        labelFn: params => params.LIST
    },

    // Sound
    sound_volume: {
        category: 'sound',
        label: '音量'
    },
    sound_tempo: {
        category: 'sound',
        label: 'tempo'
    },

    // Sensing
    sensing_answer: {
        category: 'sensing',
        label: '回答'
    },
    sensing_loudness: {
        category: 'sensing',
        label: 'loudness'
    },
    sensing_current: {
        category: 'sensing',
        labelFn: params => {
            let currentMenu = params.CURRENTMENU.toLowerCase();
            if (currentMenu === 'dayofweek') {
                currentMenu = 'day of week';
            }
            return currentMenu;
        }
    },
    sensing_timer: {
        category: 'sensing',
        label: '计时器'
    }
};

/**
 * Get the label for an opcode
 * @param {string} opcode the opcode you want a label for
 * @return {object} object with label and category
 */
export default function (opcode) {
    if (opcode in opcodeMap) return opcodeMap[opcode];
    return {
        category: 'data',
        label: opcode
    };
}
