import * as SQLite from 'expo-sqlite';
import { Int32 } from 'react-native/Libraries/Types/CodegenTypes';

export async function openDB() {
    const db = await SQLite.openDatabaseAsync('database.db');

    await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS BrewType (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, short_name TEXT NOT NULL);
        CREATE TABLE IF NOT EXISTS BrewCalculationDescriptor (id INTEGER PRIMARY KEY NOT NULL, description TEXT NOT NULL);
        CREATE TABLE IF NOT EXISTS BrewStrengthLevel (id INTEGER PRIMARY KEY NOT NULL, 
                                                        BrewTypeId INTEGER NOT NULL, 
                                                        BrewCalculationDescriptorId INTEGER NOT NULL, 
                                                        descriptionValue TEXT NOT NULL,
                                                        value INTEGER NOT NULL,
                                                        FOREIGN KEY(BrewTypeId) REFERENCES BrewType(id),
                                                        FOREIGN KEY(BrewCalculationDescriptorId) REFERENCES BrewCalculationDescriptor(id)
                                                        );
        CREATE TABLE IF NOT EXISTS BrewAmountLevel (id INTEGER PRIMARY KEY NOT NULL, 
                                                    BrewTypeId INTEGER NOT NULL,
                                                    BrewCalculationDescriptorId INTEGER NOT NULL,
                                                    descriptionValue TEXT NOT NULL,
                                                    value INTEGER NOT NULL,
                                                    coffeeOrWater INTEGER NOT NULL,
                                                    FOREIGN KEY(BrewTypeId) REFERENCES BrewType(id),
                                                    FOREIGN KEY(BrewCalculationDescriptorId) REFERENCES BrewCalculationDescriptor(id)
                                                    );
    `);

    const rowsInBrewType = await db.getAllAsync(`
        SELECT COUNT(*) AS count FROM BrewType    
    `);    
    const rowsInBrewCalculationDescriptor = await db.getAllAsync(`
        SELECT COUNT(*) AS count FROM BrewCalculationDescriptor    
    `);    
    const rowsInBrewStrengthLevel = await db.getAllAsync(`
        SELECT COUNT(*) AS count FROM BrewStrengthLevel    
    `);    
    const rowsInBrewAmountLevel = await db.getAllAsync(`
        SELECT COUNT(*) AS count FROM BrewAmountLevel    
    `);

    if(rowsInBrewType[0].count === 0) {
        db.execAsync(`
            INSERT INTO BrewType (name, short_name) VALUES ('Pour Over', 'pour');    
            INSERT INTO BrewType (name, short_name) VALUES ('French Press', 'press');    
            INSERT INTO BrewType (name, short_name) VALUES ('Vietnamese Phin', 'phin');    
            INSERT INTO BrewType (name, short_name) VALUES ('Aeropress', 'aeropress');        
        `);
    }    
    
    if(rowsInBrewCalculationDescriptor[0].count === 0) {
        db.execAsync(`
            INSERT INTO BrewCalculationDescriptor (description) VALUES ('Light');    
            INSERT INTO BrewCalculationDescriptor (description) VALUES ('Regular');    
            INSERT INTO BrewCalculationDescriptor (description) VALUES ('Strong');    
            INSERT INTO BrewCalculationDescriptor (description) VALUES ('Small');    
            INSERT INTO BrewCalculationDescriptor (description) VALUES ('Medium');    
            INSERT INTO BrewCalculationDescriptor (description) VALUES ('Large');    
            INSERT INTO BrewCalculationDescriptor (description) VALUES ('Custom');
        `);
    }    
    
    if(rowsInBrewStrengthLevel[0].count === 0) {
        db.execAsync(`
            INSERT INTO BrewStrengthLevel (BrewTypeId, BrewCalculationDescriptorId, descriptionValue, value) VALUES (
                (SELECT id FROM BrewType WHERE BrewType.name = 'Pour Over'),
                (SELECT id FROM BrewCalculationDescriptor WHERE BrewCalculationDescriptor.description = 'Light'),
                '1:18',
                18
            );         
            INSERT INTO BrewStrengthLevel (BrewTypeId, BrewCalculationDescriptorId, descriptionValue, value) VALUES (
                (SELECT id FROM BrewType WHERE BrewType.name = 'Pour Over'),
                (SELECT id FROM BrewCalculationDescriptor WHERE BrewCalculationDescriptor.description = 'Regular'),
                '1:16',
                16
            );         
            INSERT INTO BrewStrengthLevel (BrewTypeId, BrewCalculationDescriptorId, descriptionValue, value) VALUES (
                (SELECT id FROM BrewType WHERE BrewType.name = 'Pour Over'),
                (SELECT id FROM BrewCalculationDescriptor WHERE BrewCalculationDescriptor.description = 'Strong'),
                '1:15',
                15
            );         
            INSERT INTO BrewStrengthLevel (BrewTypeId, BrewCalculationDescriptorId, descriptionValue, value) VALUES (
                (SELECT id FROM BrewType WHERE BrewType.name = 'French Press'),
                (SELECT id FROM BrewCalculationDescriptor WHERE BrewCalculationDescriptor.description = 'Light'),
                '1:18',
                18
            );         
            INSERT INTO BrewStrengthLevel (BrewTypeId, BrewCalculationDescriptorId, descriptionValue, value) VALUES (
                (SELECT id FROM BrewType WHERE BrewType.name = 'French Press'),
                (SELECT id FROM BrewCalculationDescriptor WHERE BrewCalculationDescriptor.description = 'Regular'),
                '1:17',
                17
            );         
            INSERT INTO BrewStrengthLevel (BrewTypeId, BrewCalculationDescriptorId, descriptionValue, value) VALUES (
                (SELECT id FROM BrewType WHERE BrewType.name = 'French Press'),
                (SELECT id FROM BrewCalculationDescriptor WHERE BrewCalculationDescriptor.description = 'Strong'),
                '1:15',
                15
            );         
            INSERT INTO BrewStrengthLevel (BrewTypeId, BrewCalculationDescriptorId, descriptionValue, value) VALUES (
                (SELECT id FROM BrewType WHERE BrewType.name = 'Vietnamese Phin'),
                (SELECT id FROM BrewCalculationDescriptor WHERE BrewCalculationDescriptor.description = 'Light'),
                '1:9',
                9
            );         
            INSERT INTO BrewStrengthLevel (BrewTypeId, BrewCalculationDescriptorId, descriptionValue, value) VALUES (
                (SELECT id FROM BrewType WHERE BrewType.name = 'Vietnamese Phin'),
                (SELECT id FROM BrewCalculationDescriptor WHERE BrewCalculationDescriptor.description = 'Regular'),
                '1:8',
                8
            );         
            INSERT INTO BrewStrengthLevel (BrewTypeId, BrewCalculationDescriptorId, descriptionValue, value) VALUES (
                (SELECT id FROM BrewType WHERE BrewType.name = 'Vietnamese Phin'),
                (SELECT id FROM BrewCalculationDescriptor WHERE BrewCalculationDescriptor.description = 'Strong'),
                '1:7',
                7
            );          
            INSERT INTO BrewStrengthLevel (BrewTypeId, BrewCalculationDescriptorId, descriptionValue, value) VALUES (
                (SELECT id FROM BrewType WHERE BrewType.name = 'Aeropress'),
                (SELECT id FROM BrewCalculationDescriptor WHERE BrewCalculationDescriptor.description = 'Light'),
                '1:16',
                16
            );         
            INSERT INTO BrewStrengthLevel (BrewTypeId, BrewCalculationDescriptorId, descriptionValue, value) VALUES (
                (SELECT id FROM BrewType WHERE BrewType.name = 'Aeropress'),
                (SELECT id FROM BrewCalculationDescriptor WHERE BrewCalculationDescriptor.description = 'Regular'),
                '1:12',
                12
            );         
            INSERT INTO BrewStrengthLevel (BrewTypeId, BrewCalculationDescriptorId, descriptionValue, value) VALUES (
                (SELECT id FROM BrewType WHERE BrewType.name = 'Aeropress'),
                (SELECT id FROM BrewCalculationDescriptor WHERE BrewCalculationDescriptor.description = 'Strong'),
                '1:8',
                8
            );  
        `);
    }    
    
    if(rowsInBrewAmountLevel[0].count === 0) {
        db.execAsync(`
            INSERT INTO BrewAmountLevel (BrewTypeId, BrewCalculationDescriptorId, descriptionValue, value, coffeeOrWater) VALUES (
                (SELECT id FROM BrewType WHERE BrewType.name = 'Pour Over'),
                (SELECT id FROM BrewCalculationDescriptor WHERE BrewCalculationDescriptor.description = 'Small'),
                '227ml',
                227,
                1
            );         
            INSERT INTO BrewAmountLevel (BrewTypeId, BrewCalculationDescriptorId, descriptionValue, value, coffeeOrWater) VALUES (
                (SELECT id FROM BrewType WHERE BrewType.name = 'Pour Over'),
                (SELECT id FROM BrewCalculationDescriptor WHERE BrewCalculationDescriptor.description = 'Medium'),
                '320ml',
                320,
                1
            );         
            INSERT INTO BrewAmountLevel (BrewTypeId, BrewCalculationDescriptorId, descriptionValue, value, coffeeOrWater) VALUES (
                (SELECT id FROM BrewType WHERE BrewType.name = 'Pour Over'),
                (SELECT id FROM BrewCalculationDescriptor WHERE BrewCalculationDescriptor.description = 'Large'),
                '424ml',
                424,
                1
            );         
            INSERT INTO BrewAmountLevel (BrewTypeId, BrewCalculationDescriptorId, descriptionValue, value, coffeeOrWater) VALUES (
                (SELECT id FROM BrewType WHERE BrewType.name = 'French Press'),
                (SELECT id FROM BrewCalculationDescriptor WHERE BrewCalculationDescriptor.description = 'Small'),
                '340ml',
                340,
                1
            );         
            INSERT INTO BrewAmountLevel (BrewTypeId, BrewCalculationDescriptorId, descriptionValue, value, coffeeOrWater) VALUES (
                (SELECT id FROM BrewType WHERE BrewType.name = 'French Press'),
                (SELECT id FROM BrewCalculationDescriptor WHERE BrewCalculationDescriptor.description = 'Medium'),
                '500ml',
                500,
                1
            );         
            INSERT INTO BrewAmountLevel (BrewTypeId, BrewCalculationDescriptorId, descriptionValue, value, coffeeOrWater) VALUES (
                (SELECT id FROM BrewType WHERE BrewType.name = 'French Press'),
                (SELECT id FROM BrewCalculationDescriptor WHERE BrewCalculationDescriptor.description = 'Large'),
                '800ml',
                800,
                1
            );         
            INSERT INTO BrewAmountLevel (BrewTypeId, BrewCalculationDescriptorId, descriptionValue, value, coffeeOrWater) VALUES (
                (SELECT id FROM BrewType WHERE BrewType.name = 'Vietnamese Phin'),
                (SELECT id FROM BrewCalculationDescriptor WHERE BrewCalculationDescriptor.description = 'Small'),
                '95ml',
                95,
                1
            );         
            INSERT INTO BrewAmountLevel (BrewTypeId, BrewCalculationDescriptorId, descriptionValue, value, coffeeOrWater) VALUES (
                (SELECT id FROM BrewType WHERE BrewType.name = 'Vietnamese Phin'),
                (SELECT id FROM BrewCalculationDescriptor WHERE BrewCalculationDescriptor.description = 'Medium'),
                '120ml',
                120,
                1
            );         
            INSERT INTO BrewAmountLevel (BrewTypeId, BrewCalculationDescriptorId, descriptionValue, value, coffeeOrWater) VALUES (
                (SELECT id FROM BrewType WHERE BrewType.name = 'Vietnamese Phin'),
                (SELECT id FROM BrewCalculationDescriptor WHERE BrewCalculationDescriptor.description = 'Large'),
                '144ml',
                144,
                1
            );          
            INSERT INTO BrewAmountLevel (BrewTypeId, BrewCalculationDescriptorId, descriptionValue, value, coffeeOrWater) VALUES (
                (SELECT id FROM BrewType WHERE BrewType.name = 'Aeropress'),
                (SELECT id FROM BrewCalculationDescriptor WHERE BrewCalculationDescriptor.description = 'Small'),
                '144ml',
                144,
                1
            );         
            INSERT INTO BrewAmountLevel (BrewTypeId, BrewCalculationDescriptorId, descriptionValue, value, coffeeOrWater) VALUES (
                (SELECT id FROM BrewType WHERE BrewType.name = 'Aeropress'),
                (SELECT id FROM BrewCalculationDescriptor WHERE BrewCalculationDescriptor.description = 'Medium'),
                '180ml',
                180,
                1
            );         
            INSERT INTO BrewAmountLevel (BrewTypeId, BrewCalculationDescriptorId, descriptionValue, value, coffeeOrWater) VALUES (
                (SELECT id FROM BrewType WHERE BrewType.name = 'Aeropress'),
                (SELECT id FROM BrewCalculationDescriptor WHERE BrewCalculationDescriptor.description = 'Large'),
                '216ml',
                216,
                1
            );  
            INSERT INTO BrewAmountLevel (BrewTypeId, BrewCalculationDescriptorId, descriptionValue, value, coffeeOrWater) VALUES (
                (SELECT id FROM BrewType WHERE BrewType.name = 'Pour Over'),
                (SELECT id FROM BrewCalculationDescriptor WHERE BrewCalculationDescriptor.description = 'Small'),
                '15g',
                15,
                0
            );         
            INSERT INTO BrewAmountLevel (BrewTypeId, BrewCalculationDescriptorId, descriptionValue, value, coffeeOrWater) VALUES (
                (SELECT id FROM BrewType WHERE BrewType.name = 'Pour Over'),
                (SELECT id FROM BrewCalculationDescriptor WHERE BrewCalculationDescriptor.description = 'Medium'),
                '20g',
                20,
                0
            );         
            INSERT INTO BrewAmountLevel (BrewTypeId, BrewCalculationDescriptorId, descriptionValue, value, coffeeOrWater) VALUES (
                (SELECT id FROM BrewType WHERE BrewType.name = 'Pour Over'),
                (SELECT id FROM BrewCalculationDescriptor WHERE BrewCalculationDescriptor.description = 'Large'),
                '30g',
                30,
                0
            );         
            INSERT INTO BrewAmountLevel (BrewTypeId, BrewCalculationDescriptorId, descriptionValue, value, coffeeOrWater) VALUES (
                (SELECT id FROM BrewType WHERE BrewType.name = 'French Press'),
                (SELECT id FROM BrewCalculationDescriptor WHERE BrewCalculationDescriptor.description = 'Small'),
                '20g',
                20,
                0
            );         
            INSERT INTO BrewAmountLevel (BrewTypeId, BrewCalculationDescriptorId, descriptionValue, value, coffeeOrWater) VALUES (
                (SELECT id FROM BrewType WHERE BrewType.name = 'French Press'),
                (SELECT id FROM BrewCalculationDescriptor WHERE BrewCalculationDescriptor.description = 'Medium'),
                '35g',
                35,
                0
            );         
            INSERT INTO BrewAmountLevel (BrewTypeId, BrewCalculationDescriptorId, descriptionValue, value, coffeeOrWater) VALUES (
                (SELECT id FROM BrewType WHERE BrewType.name = 'French Press'),
                (SELECT id FROM BrewCalculationDescriptor WHERE BrewCalculationDescriptor.description = 'Large'),
                '47g',
                47,
                0
            );         
            INSERT INTO BrewAmountLevel (BrewTypeId, BrewCalculationDescriptorId, descriptionValue, value, coffeeOrWater) VALUES (
                (SELECT id FROM BrewType WHERE BrewType.name = 'Vietnamese Phin'),
                (SELECT id FROM BrewCalculationDescriptor WHERE BrewCalculationDescriptor.description = 'Small'),
                '12g',
                12,
                0
            );         
            INSERT INTO BrewAmountLevel (BrewTypeId, BrewCalculationDescriptorId, descriptionValue, value, coffeeOrWater) VALUES (
                (SELECT id FROM BrewType WHERE BrewType.name = 'Vietnamese Phin'),
                (SELECT id FROM BrewCalculationDescriptor WHERE BrewCalculationDescriptor.description = 'Medium'),
                '14g',
                14,
                0
            );         
            INSERT INTO BrewAmountLevel (BrewTypeId, BrewCalculationDescriptorId, descriptionValue, value, coffeeOrWater) VALUES (
                (SELECT id FROM BrewType WHERE BrewType.name = 'Vietnamese Phin'),
                (SELECT id FROM BrewCalculationDescriptor WHERE BrewCalculationDescriptor.description = 'Large'),
                '16g',
                16,
                0
            );          
            INSERT INTO BrewAmountLevel (BrewTypeId, BrewCalculationDescriptorId, descriptionValue, value, coffeeOrWater) VALUES (
                (SELECT id FROM BrewType WHERE BrewType.name = 'Aeropress'),
                (SELECT id FROM BrewCalculationDescriptor WHERE BrewCalculationDescriptor.description = 'Small'),
                '12g',
                12,
                0
            );         
            INSERT INTO BrewAmountLevel (BrewTypeId, BrewCalculationDescriptorId, descriptionValue, value, coffeeOrWater) VALUES (
                (SELECT id FROM BrewType WHERE BrewType.name = 'Aeropress'),
                (SELECT id FROM BrewCalculationDescriptor WHERE BrewCalculationDescriptor.description = 'Medium'),
                '15g',
                15,
                0
            );         
            INSERT INTO BrewAmountLevel (BrewTypeId, BrewCalculationDescriptorId, descriptionValue, value, coffeeOrWater) VALUES (
                (SELECT id FROM BrewType WHERE BrewType.name = 'Aeropress'),
                (SELECT id FROM BrewCalculationDescriptor WHERE BrewCalculationDescriptor.description = 'Large'),
                '18g',
                18,
                0
            );  
        `);
    }
}

export async function getBrewTypes() {
    const db = await SQLite.openDatabaseAsync('database.db');

    const result = await db.getAllAsync(`
        SELECT * FROM BrewType
    `);

    return result;
}

export async function getStrengthOptions(brewTypeName: string) {
    const db = await SQLite.openDatabaseAsync('database.db');

    const result = await db.getAllAsync(`
        SELECT * FROM BrewStrengthLevel
        WHERE BrewStrengthLevel.BrewTypeId = (SELECT id FROM BrewType WHERE BrewType.short_name = '${brewTypeName}')
    `);

    return result;
}

export async function getSizeOptions(brewTypeName: string) {
    const db = await SQLite.openDatabaseAsync('database.db');

    const result = await db.getAllAsync(`
        SELECT * FROM BrewAmountLevel
        WHERE BrewAmountLevel.BrewTypeId = (SELECT id FROM BrewType WHERE BrewType.short_name = '${brewTypeName}')
    `);

    return result;
}

export async function getSelectionOptionDescription(brewTypeId) {
    const db = await SQLite.openDatabaseAsync('database.db');

    const result = await db.getFirstAsync(`
       SELECT description FROM BrewCalculationDescriptor
       WHERE BrewCalculationDescriptor.id = '${brewTypeId}';
    `);

    return result;
}