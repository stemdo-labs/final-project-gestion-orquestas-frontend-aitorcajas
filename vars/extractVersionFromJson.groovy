// vars/extractVersionFromJson.groovy
def call(String jsonFile) {
    def json = readJSON file: jsonFile
    return json.version
}
