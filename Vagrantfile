# -*- mode: ruby -*-
# vi: set ft=ruby :

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.
Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/focal64"
  config.vm.box_check_update = false
  config.vm.network "forwarded_port", guest: 80, host: 8080
  config.vm.synced_folder "./src", "/var/www/html", owner: "www-data", group:"www-data"

  config.vm.provision "shell", inline: <<-SHELL
     apt-get update
     apt-get install -y apache2
     systemctl restart apache2
  SHELL
end
