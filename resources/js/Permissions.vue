<script>
export default {
    methods: {
        $can(permissionName) {
            let tienepermiso = false;
            let permisos = JSON.parse(localStorage.getItem("permisos"));
            permisos.forEach(element => {
                if (element.name == permissionName) {
                    tienepermiso = true;
                }
            });

            return tienepermiso;
            // return Permissions.indexOf(permissionName) !== -1;
        }
    }
};
</script>
