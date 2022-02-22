export type colorType = ('primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'contrast');
export type variantType = ('solid' | 'outline' | 'minimal' | 'link');

export const resolveColor = (color: colorType) => {
    switch(color) {
        case 'success': return 'green-500';
        case 'danger': return 'red-500';
        case 'warning': return 'yellow-500';
        default: return color;
    }
}

export class classNameBuilder {
    _class = ['transition-all'];

    constructor(_class) {
        this._class.push(_class);
    }

    add(_class) {
        this._class.push(_class);
        return this;
    }

    toString() {
        return this._class.join(' ');
    }
};

export const resolveClassName = (variant, color, className) => {
    let _class = new classNameBuilder(className);

    switch (variant) {
        case 'solid':
            _class
                .add(`bg-${resolveColor(color)}`)
                .add(`border-${resolveColor(color)}`)
                .add(`hover:text-${resolveColor(color)}`);

            if (color === 'contrast') _class.add('text-contrast-negative');
            break;
        case 'link':
            _class
                .add('border-transparent')
                .add(`text-${resolveColor(color)}`);
            break;
        case 'minimal':
            _class
                .add('border-transparent')
                .add(`text-${resolveColor(color)}`);
            break;
        case 'outline':
            _class
                .add(`border-${resolveColor(color)}`)
                .add(`text-${resolveColor(color)}`)
                .add(`hover:bg-${resolveColor(color)}`);

            if (color === 'contrast') _class.add('hover:text-contrast-negative');
            break;
    }

    return _class.toString();
};