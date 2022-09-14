public void ConfigureServices(IServiceCollection services)
        {
            services.AddScoped<ITokenService,TokenService>();
            services.AddDbContext<APIDataContext>(opt=>
            {
                opt.UseSqlite(_config.GetConnectionString("DefaultConnection"));
            });
            services.AddControllers();
            services.AddCors();
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                    .AddJwtBearer(options=>{
                                                options.TokenValidationParameters = new TokenValidationParameters
                                                {
                                                    ValidateIssuerSigningKey = true,
                                                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["TokenKey"])),
                                                    ValidateIssuer = false,
                                                    ValidateAudience = false
                                                };
                                           });
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "WebAPIv5", Version = "v1" });
            });
        }

....

public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "WebAPIv5 v1"));
            }

            app.UseHttpsRedirection();

            app.UseRouting();
            app.UseCors(x=>x.AllowAnyHeader().
                             AllowAnyMethod().WithOrigins(new string[]{"http://localhost:4200",
                                                                       "https://localhost:4200"}));

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }