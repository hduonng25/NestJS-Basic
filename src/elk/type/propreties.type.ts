type PropertyName = string;

type MappingProperty = MappingPropertyType;

type MappingPropertyType = {
    type: 'text' | 'float' | 'keyword';
};

export type PropretiesType = Record<PropertyName, MappingProperty>;
